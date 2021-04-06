const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');

/* POST auth/users */
router.post('/users', (req, res, next) => {
  const username = req.fields.username;
  const password = req.fields.password;

  pool.query(
    `SELECT * FROM users WHERE username=$1;`,
    [username],
    (err, result) => {
      if (err) throw err;
      if (result.rows.length === 0) {
        console.log("User not found");
        res.status(404).json({message: "User not found."});
      } else {
        const user = result.rows[0];
        bcrypt.compare(password, user.password, (err, same) => {
          if (err) throw err;
          if (same) {
            res.json({ id: user.id });
            console.log(`User ID: ${user.id}`);
          } else {
            res.json({ error: "Wrong password" });
            console.log("Wrong password");
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