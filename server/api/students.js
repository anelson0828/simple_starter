const express = require('express');
const router = express.Router();
const { Student, Campus } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const campuses = await Campus.findAll({ include: [{ model: Student }] });
    res.send(campuses);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
