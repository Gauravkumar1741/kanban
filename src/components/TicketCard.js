// src/components/TicketCard.js
import React from "react";
import "./TicketCard.css";

const TicketCard = ({ ticket }) => {
    return (
        <div className="ticket-card">
            <h3>{ticket.title}</h3>
            <p>ID: {ticket.id}</p>
            <p>Priority: {ticket.priority}</p>
            <p>User ID: {ticket.user_id}</p>
            <p>Status: {ticket.status}</p>
        </div>
    );
};

export default TicketCard;
