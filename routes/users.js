const express = require('express');
const router = express.Router();
const reqTracker = require('../middleware/reqTracker');

const dbUsers = require('../db/users');
const pw = require('../helpers/passwords');

const dbEndpoints= require('../db/endpoints');

/* POST users */
router.post('/', reqTracker, (req, res, next) => {
  let name = req.body.name;
  let username = req.body.username;
  let password = req.body.password;

  dbUsers.getUserByUsername(username).then(result => {
    const resultExists = result.rows !== undefined && result.rows.length > 0;

    if (!resultExists) {
      pw.hashPassword(password).then(hash => {
        dbUsers.createUser(name, username, hash).then(result => {
          res.status(201).json(result.rows[0]);
        }).catch(err => {
          throw err;
        });
      }).catch(err => {
        throw err;
      });
    } else {
      res.status(400).json({ error: "Username already exists" });
    }

  }).catch(err => {
    throw err;
  });
});

/* GET user show. */
router.get('/:id', reqTracker, (req, res, next) => {
  let id = req.params.id;

  dbUsers.getUserById(id).then(result => {
    const resultExists = result.rows !== undefined && result.rows.length > 0;

    if (!resultExists) {
      res.status(404).json({message: "User not found."});
    } else {
      const user = result.rows[0];
      res.status(200).json(user);
    }
  }).catch(err => {
    res.status(400).json({
      error: err.message
    });
  });
});

/* PUT user */
router.put('/:id', reqTracker, (req, res, next) => {
  let id = req.params.id;
  let name = req.body.name;
  let username = req.body.username;

  dbUsers.updateUser(id, name, username).then(result => {
    const resultExists = result.rows !== undefined && result.rows.length > 0;

    if(!resultExists) {
      res.status(404).json({message: "User not found."});
    } else {
      const user = result.rows[0];
      res.json(user);
    }
  }).catch(err => {
    throw err;
  });
});

/* DELETE user */
router.delete('/:id', reqTracker, (req, res, next) => {
  let id = req.params.id;
  
  dbUsers.deleteUser(id).then(result => {
    if(result.rowCount === 0) {
      res.status(404).json({message: "User not found."});
    } else {
      res.json({ message: "User successfully deleted" });
    }
  }).catch(err => {
    throw err;
  });
});

// ENDPOINTS ----


/* GET user endpoints index */
router.get('/:id/endpoints', reqTracker, (req, res, next) => {
  let id = req.params.id;

  dbEndpoints.getEndpointsByUserId(id).then(result => {
    const resultExists = result.rows !== undefined && result.rows.length > 0;
    if (!resultExists) {
      res.status(404).json({message: "Endpoint not found."});
    } else {
      res.json(result.rows);
    }
  }).catch(err => {
    throw err;
  });
});

/* POST user endpoints */
router.post('/:id/endpoints/', reqTracker, (req, res, next) => {
  let id = req.params.id;
  let name = req.body.name;
  let data = req.body.data;

  dbEndpoints.createEndpoint(id, name, data).then(result => {
    const resultExists = result.rows !== undefined && result.rows.length > 0;
    if (!resultExists) {
      res.status(401).json({message: "Could not create."});
    } else {
      const endpoint = result.rows[0];
      res.status(201).json(endpoint);
    }
  }).catch(err => {
    throw err;
  });
});

/* GET user endpoint show */
router.get('/:id/endpoints/:endpoint_name', reqTracker, (req, res, next) => {
  let id = req.params.id;
  let name = req.params.endpoint_name;

  dbEndpoints.getEndpointByName(id, name).then(result => {
    const resultExists = result.rows !== undefined && result.rows.length > 0;
    if (!resultExists) {
      res.status(404).json({message: "Endpoint not found."});
    } else {
      const endpoint = result.rows[0];
      res.json(endpoint);
    }
  }).catch(err => {
    throw err;
  });
});

/* PUT user endpoint */
router.put('/:id/endpoints/:endpoint_name', reqTracker, (req, res, next) => {
  let id = req.params.id;
  let originalName = req.params.endpoint_name;
  let name = req.body.name;
  let data = req.body.data;

  dbEndpoints.updateEndpoint(name, data, id, originalName).then(result => {
    const resultExists = result.rows !== undefined && result.rows.length > 0;
    if (!resultExists) {
      res.status(404).json({message: "Endpoint not found."});
    } else {
      const endpoint = result.rows[0];
      res.json(endpoint);
    }
  }).catch(err => {
    throw err;
  });
});

/* DELETE user endpoint */
router.delete('/:id/endpoints/:endpoint_name', reqTracker, (req, res, next) => {
  let id = req.params.id;
  let name = req.params.endpoint_name;
  
  dbEndpoints.deleteEndpoint(id, name).then(result => {
    if (result.rowCount === 0) {
      res.status(404).json({message: "Endpoint not found."});
    } else {
      res.json({ message: "Endpoint successfully deleted" });
    }
  }).catch(err => {
    throw err;
  });
});

module.exports = router;