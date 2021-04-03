const express = require('express');
const router = express.Router();
const reqTracker = require('../middleware/reqTracker');
const pool = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* POST users */
router.post('/', reqTracker, (req, res, next) => {
  let name = req.fields.name;
  let username = req.fields.username;
  let password = req.fields.password;

  bcrypt.hash(password, saltRounds, (err, hash) =>{
    pool.query(`
    INSERT INTO users (name, username, password)
      VALUES ('${name}', '${username}', '${hash}');
    `, (err, result) => {
      if (err) throw err;
    });
    res.json({
      message: "post users"
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
    if (err) throw err;
    res.json({
      name: result.rows[0].name,
      username: result.rows[0].username
    });
  });
});

/* PUT user */
router.put('/:id', reqTracker, (req, res, next) => {
  let id = req.params.id;
  let name = req.fields.name;
  let username = req.fields.username;
  let password = req.fields.password;

  bcrypt.hash(password, saltRounds, (err, hash) =>{
    pool.query(`
    UPDATE users
      SET name='${name}', username='${username}', password='${hash}'
      WHERE id='${id}';
    `, (err, result) => {
      if (err) throw err;
    });
    res.json({
      message: "put users"
    });
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
  });
  res.json({
    message: "delete users"
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