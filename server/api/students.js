const express = require('express');
const router = express.Router();
const { Student } = require('../db');

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
    const student = await Student.findByPk(req.params.studentId);
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

router.put('/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    student.update(req.body);
    res.status(200).send(student);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
