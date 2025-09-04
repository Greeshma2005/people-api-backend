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

// GET single person by ID
router.get('/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).json({ message: 'Person not found' });
    res.json(person);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// POST
router.post('/', async (req, res) => {
    try {
        const { name, age, gender, mobile } = req.body;

        if (!name || !age || !gender || !mobile) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newPerson = new Person({ name, age, gender, mobile });
        const savedPerson = await newPerson.save();

        res.status(201).json(savedPerson);
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
// DELETE multiple people
router.delete('/', async (req, res) => {
  try {
    const { ids } = req.body; // expect { ids: ['id1', 'id2', ...] }

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'No IDs provided' });
    }

    const result = await Person.deleteMany({ _id: { $in: ids } });

    res.json({ message: `${result.deletedCount} people deleted` });
  } catch (err) {
    res.status(500).json({ message: err.message });
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