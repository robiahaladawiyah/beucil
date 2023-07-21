const Event = require('../models/eventmodel');

// Controller for creating a new event
const createEvent = async (req, res) => {
  try {
    const { title, start, end } = req.body;
    const event = new Event({ title, start, end });
    await event.save();
    res.status(201).json({ event });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// Controller for retrieving all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve events' });
  }
};

// Controller for updating an event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, start, end } = req.body;
    const event = await Event.findByIdAndUpdate(id, { title, start, end }, { new: true });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ event });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

// Controller for deleting an event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

module.exports = { createEvent, getEvents, updateEvent, deleteEvent };
