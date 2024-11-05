// src/components/KanbanBoard.js
import React, { useState, useEffect } from "react";
import { fetchTickets } from "../services/api";
import Column from "./Column";
import "./KanbanBoard.css";
import "./card.js";

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [groupBy, setGroupBy] = useState("status"); // Options: status, user, priority
    const [sortBy, setSortBy] = useState("priority"); // Options: priority, title
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTickets = async () => {
            setLoading(true);
            const data = await fetchTickets();
            if (data) setTickets(data.tickets);
            setLoading(false);
        };
        loadTickets();
    }, []);

    const groupTickets = () => {
        if (groupBy === "status") {
            return groupByField(tickets, "status");
        } else if (groupBy === "user") {
            return groupByField(tickets, "user_id");
        } else if (groupBy === "priority") {
            return groupByField(tickets, "priority");
        }
        return {};
    };

    const groupByField = (data, field) => {
        return data.reduce((acc, ticket) => {
            const key = ticket[field];
            if (!acc[key]) acc[key] = [];
            acc[key].push(ticket);
            return acc;
        }, {});
    };

    const sortTickets = (tickets) => {
        if (sortBy === "priority") {
            return tickets.sort((a, b) => b.priority - a.priority);
        } else if (sortBy === "title") {
            return tickets.sort((a, b) => a.title.localeCompare(b.title));
        }
        return tickets;
    };

    const groupedTickets = groupTickets();

    return (
        <div>
            <h1>Kanban Board</h1>
            <div className="controls">
                <select onChange={(e) => setGroupBy(e.target.value)} value={groupBy}>
                    <option value="status">Group by Status</option>
                    <option value="user">Group by User</option>
                    <option value="priority">Group by Priority</option>
                </select>
                <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                    <option value="priority">Sort by Priority</option>
                    <option value="title">Sort by Title</option>
                </select>
            </div>
            <div className="kanban-board">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    Object.entries(groupedTickets).map(([group, tickets]) => (
                        <Column key={group} title={group} tickets={sortTickets(tickets)} />
                    ))
                )}
            </div>
        </div>
    );
};

export default KanbanBoard;
