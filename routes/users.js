const express = require('express');
const router = express.Router();
const reqTracker = require('../middleware/reqTracker');


/* POST users */
router.post('/', reqTracker, (req, res, next) => {
  res.json({
    message: "post users"
  });
});

/* GET user show. */
router.get('/:id', reqTracker, (req, res, next) => {
  res.json({
    message: "hello"
  });
});

/* PUT user */
router.put('/:id', reqTracker, (req, res, next) => {
  res.json({
    message: "hello"
  });
});

/* DELETE user */
router.delete('/:id', reqTracker, (req, res, next) => {
  res.json({
    message: "hello"
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