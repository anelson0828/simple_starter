const express = require('express');
const router = express.Router();
const { Student, Campus } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.send(students);
  } catch (err) {
    next(err);
  }
});

router.get('/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId, {
      include: [{ model: Campus }],
    });
    res.send(student);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.send(student);
  } catch (err) {
    next(err);
  }
});

router.delete('/:studentId', (req, res, next) => {
  try {
    Student.destroy({
      where: {
        id: req.params.studentId,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.put('/:studentId', (req, res, next) => {
  try {
    const updatedStudent = Student.update(
      { ...req.body },
      { where: { id: req.params.studentId } }
    );
    res.status(204).json(updatedStudent);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
