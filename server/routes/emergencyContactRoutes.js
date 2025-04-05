const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const EmergencyContact = require('../models/EmergencyContact');

// Get all emergency contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await EmergencyContact.find({ isActive: true })
            .sort({ category: 1, name: 1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get contacts by category
router.get('/category/:category', async (req, res) => {
    try {
        const contacts = await EmergencyContact.find({
            category: req.params.category,
            isActive: true
        }).sort({ name: 1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new emergency contact (admin only)
router.post('/', auth, async (req, res) => {
    try {
        const contact = new EmergencyContact({
            ...req.body,
            createdBy: req.user.id
        });
        const newContact = await contact.save();
        res.status(201).json(newContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update emergency contact (admin only)
router.put('/:id', auth, async (req, res) => {
    try {
        const contact = await EmergencyContact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        
        Object.assign(contact, req.body);
        const updatedContact = await contact.save();
        res.json(updatedContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete emergency contact (admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        const contact = await EmergencyContact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        
        contact.isActive = false;
        await contact.save();
        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 