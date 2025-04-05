import React from 'react';
import './EmergencyContacts.css';

const ContactCard = ({ contact }) => {
    return (
        <div className={`contact-card ${contact.category}`}>
            <div className="contact-header">
                <h3>{contact.name}</h3>
                <span className="category-badge">{contact.category}</span>
            </div>
            <div className="contact-details">
                <p><strong>Designation:</strong> {contact.designation}</p>
                <p><strong>Department:</strong> {contact.department}</p>
                <p>
                    <strong>Phone:</strong> 
                    <a href={`tel:${contact.phoneNumber}`} className="contact-link">
                        <span className="icon">📞</span> {contact.phoneNumber}
                    </a>
                </p>
                <p>
                    <strong>Email:</strong> 
                    <a href={`mailto:${contact.email}`} className="contact-link">
                        <span className="icon">✉️</span> {contact.email}
                    </a>
                </p>
                {contact.description && (
                    <p className="description">
                        <strong>Description:</strong> {contact.description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ContactCard; 