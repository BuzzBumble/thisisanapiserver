const express = require('express');
const router = express.Router();
const reqTracker = require('../middleware/reqTracker');
const dbUsers = require('../db/users');
const pw = require('../helpers/passwords');
const jwt = require('jsonwebtoken');

/* POST auth/users */
router.post('/users', reqTracker, (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  dbUsers.getUserByUsername(username).then(result => {
    const resultExists = result.rows !== undefined && result.rows.length > 0;
    if (!resultExists) {
      res.status(401).json({error: "User not found."});
    } else {
      const token = jwt.sign({ username }, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: 600,
      })
      const user = result.rows[0];
      pw.checkPassword(password, user.password).then(same => {
        if (same) {
          res.status(201).json({ jwt: token });
        } else {
          res.status(401).json({error: "Wrong password" });
        }
      }).catch(err => {
        // BCrypt Compare error
        throw err;
      });
    }
  }).catch(err => {
    // Database error
    throw err;
  });
});

/* DELETE auth/users */
router.delete('/users/:id',  reqTracker,(req, res, next) => {

});

/* POST auth/admins */
router.post('/admins', reqTracker, (req, res, next) => {

});

/* DELETE auth/admins */
router.delete('/admins/:id', reqTracker, (req, res, next) => {

});

module.exports = router;