const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');

/* POST auth/users */
router.post('/users', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  pool.query(
    `SELECT * FROM users WHERE username=$1;`,
    [username],
    (err, result) => {
      if (err) throw err;
      if (result.rows.length === 0) {
        res.status(401).json({error: "User not found."});
      } else {
        const user = result.rows[0];
        bcrypt.compare(password, user.password, (err, same) => {
          if (err) throw err;
          if (same) {
            res.status(201).json({ id: user.id });
          } else {
            res.status(401).json({error: "Wrong password" });
          }
        })
      }
    }
  );
});

/* DELETE auth/users */
router.delete('/users/:id', (req, res, next) => {

});


/* POST auth/admins */
router.post('/admins', (req, res, next) => {

});

/* DELETE auth/admins */
router.delete('/admins/:id', (req, res, next) => {

});

module.exports = router;