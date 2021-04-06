const express = require('express');
const router = express.Router();
const reqTracker = require('../middleware/reqTracker');
const pool = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* POST users */
router.post('/', reqTracker, (req, res, next) => {
  let name = req.body.name;
  let username = req.body.username;
  let password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) =>{
    pool.query(`
    INSERT INTO users (name, username, password)
      VALUES ('${name}', '${username}', '${hash}')
      RETURNING id;
    `, (err, result) => {
      if (err) throw err;

      res.status(201).json(result.rows[0]);
    });
  });
});

/* GET user show. */
router.get('/:id', reqTracker, (req, res, next) => {
  let id = req.params.id;

  pool.query(`
  SELECT name, username FROM users
    WHERE id='${id}';
  `, (err, result) => {
    if (err) {
      res.status(400).json({
        error: err.message
      });
      return;
    }
    
    if(result.rows === undefined || result.rows.length === 0) {
      res.status(404).json({message: "User not found."});
    } else {
      res.json({
        name: result.rows[0].name,
        username: result.rows[0].username
      });
    }
  });
});

/* PUT user */
router.put('/:id', reqTracker, (req, res, next) => {
  let id = req.params.id;
  let name = req.body.name;
  let username = req.body.username;

  pool.query(`
  UPDATE users
    SET name='${name}', username='${username}'
    WHERE id='${id}'
    RETURNING name, username;
  `, (err, result) => {
    if (err) throw err;

    if(!result.rows[0]) {
      res.status(404).json({message: "User not found."});
    } else {
      res.json({
        name: result.rows[0].name,
        username: result.rows[0].username
      });
    }
  });
});

/* DELETE user */
router.delete('/:id', reqTracker, (req, res, next) => {
  let id = req.params.id;
  
  pool.query(`
  DELETE FROM users
    WHERE id='${id}';
  `, (err, result) => {
    if (err) throw err;

    if(!result.rows[0]) {
      res.status(404).json({message: "User not found."});
    } else {
      res.json({
        name: result.rows[0].name,
        username: result.rows[0].username
      });
    }
  });
});

// ENDPOINTS ----


/* GET user endpoints index */
router.get('/:id/endpoints', reqTracker, (req, res, next) => {
  res.json({
    message: "hello"
  });
});

/* POST user endpoints */
router.post('/:id/endpoints/', reqTracker, (req, res, next) => {
  res.json({
    message: "hello"
  });
});

/* GET user endpoint show */
router.get('/:id/endpoints/:endpoint_name', reqTracker, (req, res, next) => {
  res.json({
    message: "hello"
  });
});

/* PUT user endpoint */
router.put('/:id/endpoints/:endpoint_name', reqTracker, (req, res, next) => {
  res.json({
    message: "hello"
  });
});

/* DELETE user endpoint */
router.delete('/:id/endpoints/:endpoint_name', reqTracker, (req, res, next) => {
  res.json({
    message: "hello"
  });
});

module.exports = router;