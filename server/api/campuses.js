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

router.get('/:campusId', async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.campusId, {
      include: [{ model: Student }],
    });
    res.send(campus);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const campus = await Campus.create(req.body);
    res.json(campus);
  } catch (err) {
    next(err);
  }
});

router.delete('/:campusId', (req, res, next) => {
  try {
    Campus.destroy({
      where: {
        id: req.params.campusId,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.put('/:campusId', (req, res, next) => {
  try {
    const updatedCampus = Campus.update(
      { ...req.body },
      { where: { id: req.params.campusId } }
    );
    res.status(204).json(updatedCampus);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
