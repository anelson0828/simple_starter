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

router.get('/page/:page', (req, res) => {
  let limit = 12; // number of records per page
  let offset = 0;
  Campus.findAndCountAll()
    .then(data => {
      let page = req.params.page; // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);

      let filter = req.query.filter;

      Campus.findAll({
        include: [
          {
            model: Student,
          },
        ],
        limit: limit,
        offset: offset,
        $sort: { id: 1 },
      }).then(campuses => {
        res
          .status(200)
          .json({ result: campuses, count: data.count, pages: pages });
      });
    })
    .catch(function(error) {
      res.status(500).send('Internal Server Error', error);
    });
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
