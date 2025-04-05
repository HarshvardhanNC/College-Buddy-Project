import React from 'react';
import './EmergencyContacts.css';

const EmergencyContactsPage = () => {
    // Static emergency contacts data
    const contacts = [
        {
            id: 1,
            name: "Campus Security Office",
            designation: "Chief Security Officer",
            department: "Security Department",
            phoneNumber: "100",
            email: "security@college.edu",
            category: "security",
            description: "24/7 Campus Security Services"
        },
        {
            id: 2,
            name: "College Health Center",
            designation: "Chief Medical Officer",
            department: "Health Services",
            phoneNumber: "102",
            email: "health@college.edu",
            category: "medical",
            description: "Emergency Medical Services"
        },
        {
            id: 3,
            name: "Fire Emergency",
            designation: "Fire Safety Officer",
            department: "Safety Department",
            phoneNumber: "101",
            email: "fire@college.edu",
            category: "security",
            description: "Fire Emergency Services"
        },
        {
            id: 4,
            name: "Student Affairs Office",
            designation: "Dean of Students",
            department: "Student Affairs",
            phoneNumber: "1234567890",
            email: "dean@college.edu",
            category: "administrative",
            description: "Student Emergency Support"
        },
        {
            id: 5,
            name: "Counseling Center",
            designation: "Head Counselor",
            department: "Student Support Services",
            phoneNumber: "1234567891",
            email: "counseling@college.edu",
            category: "medical",
            description: "24/7 Mental Health Support"
        },
        {
            id: 6,
            name: "Maintenance Department",
            designation: "Maintenance Head",
            department: "Facilities",
            phoneNumber: "1234567892",
            email: "maintenance@college.edu",
            category: "other",
            description: "Infrastructure & Utilities Emergency"
        },
        {
            id: 7,
            name: "Anti-Ragging Committee",
            designation: "Committee Head",
            department: "Student Welfare",
            phoneNumber: "1234567893",
            email: "antiragging@college.edu",
            category: "administrative",
            description: "Anti-Ragging Support"
        },
        {
            id: 8,
            name: "Women's Safety Cell",
            designation: "Cell Coordinator",
            department: "Student Safety",
            phoneNumber: "1234567894",
            email: "womensafety@college.edu",
            category: "security",
            description: "Women's Safety Emergency Support"
        }
    ];

    return (
        <div className="emergency-contacts-container">
            <div className="emergency-contacts-header">
                <h1>Emergency Contacts</h1>
            </div>

            <div className="contacts-grid">
                {contacts.map(contact => (
                    <div key={contact.id} className={`contact-card ${contact.category}`}>
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
                ))}
            </div>
        </div>
    );
};

export default EmergencyContactsPage; 