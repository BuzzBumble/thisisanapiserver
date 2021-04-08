const pool = require('../db/db');

const reqTracker = (req, res, next) => {
  let path = req.baseUrl + req.route.path;
  pool.query(`
  INSERT INTO requests (path, method)
    VALUES ($1, $2)
  `,
  [path, req.method],
  (err) => {
    if (err) throw err;
    next();
  });
};

module.exports = reqTracker;