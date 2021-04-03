const pool = require('../db');

const reqTracker = (req, res, next) => {
  pool.query(`
  INSERT INTO requests (path, method)
    VALUES ($1, $2)
  `,
  [req.path, req.method],
  (err) => {
    if (err) throw err;
    
    console.log("REQUEST ADDED");
    next();
  });
};

module.exports = reqTracker;