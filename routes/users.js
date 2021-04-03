var express = require('express');
var router = express.Router();

/* POST users */
router.post('/', (req, res, next) => {
});

/* GET user show. */
router.get('/:id', (req, res, next) => {
});

/* PUT user */
router.put('/:id', (req, res, next) => {
});

/* DELETE user */
router.delete('/:id', (req, res, next) => {
});

// ENDPOINTS ----


/* GET user endpoints index */
router.get('/:id/endpoints', (req, res, next) => {
});

/* POST user endpoints */
router.post('/:id/endpoints/', (req, res, next) => {
});

/* GET user endpoint show */
router.get('/:id/endpoints/:endpoint_id', (req, res, next) => {
});

/* PUT user endpoint */
router.put('/:id/endpoints/:endpoint_id', (req, res, next) => {
});

/* DELETE user endpoint */
router.delete('/:id/endpoints/:endpoint_id', (req, res, next) => {
});

module.exports = router;