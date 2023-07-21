const express = require('express');
const eventController = require('../controllers/eventcontroller');

const router = express.Router();

// Create a new event
router.post('/events', eventController.createEvent);

// Get all events
router.get('/events', eventController.getEvents);

// Update an event
router.put('/events/:id', eventController.updateEvent);

// Delete an event
router.delete('/events/:id', eventController.deleteEvent);

module.exports = router;
