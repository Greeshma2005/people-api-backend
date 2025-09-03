const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// GET 
router.get('/', async (req, res) => {
    try {
        const people = await Person.find();
        res.json(people);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST
router.post('/', async (req, res) => {
    try {
        if (!Array.isArray(req.body) || req.body.length === 0) {
            return res.status(400).json({ message: 'Request body must be a non-empty array of people' });
        }
        const people = await Person.insertMany(req.body);
        res.status(201).json(people);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT
router.put('/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) return res.status(404).json({ message: 'Person not found' });

        person.name = req.body.name || person.name;
        person.age = req.body.age || person.age;
        person.gender = req.body.gender || person.gender;
        person.mobile = req.body.mobile || person.mobile;

        const updatedPerson = await person.save();
        res.json(updatedPerson);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) return res.status(404).json({ message: 'Person not found' });
        await person.deleteOne();

        res.json({ message: 'Person deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;