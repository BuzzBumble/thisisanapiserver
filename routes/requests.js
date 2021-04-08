const express = require('express');
const router = express.Router();
const pool = require('../db/db');

/* GET requests index */
router.get('/', (req, res, next) => {
  let obj = {};
  pool.query(`
  SELECT path, method, COUNT(path)
    FROM requests
      GROUP BY path, method
      ORDER BY COUNT(path) DESC;
  `, (err, result) => {
    if (err) throw err;

    res.json(result.rows);
  });
});

module.exports = router;