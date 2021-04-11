const pool = require('./db');

const getEndpointsByUserId = (id) => {
  const query = `
    SELECT id, name, data FROM endpoints
      WHERE user_id=$1;
  `;

  return pool.query(query, [id]);
}

const createEndpoint = (userId, name, data) => {
  const query = `
  INSERT INTO endpoints (user_id, name, data)
    VALUES ($1, $2, $3)
      RETURNING id, name, data;
  `;

  return pool.query(query, [userId, name, data]);
}

const getEndpointByName = (userId, name) => {
  const query = `
  SELECT id, name, data FROM endpoints
    WHERE user_id=$1 AND name=$2;
  `;

  return pool.query(query, [userId, name]);
}

const updateEndpoint = (name, data, userId, originalName) => {
  const query = `
  UPDATE endpoints
    SET name=$1, data=$2
      WHERE user_id=$3 AND name=$4
        RETURNING id, name, data;
  `;

  return pool.query(query, [name, data, userId, originalName]);
}

const deleteEndpoint = (userId, name) => {
  const query = `
  DELETE FROM endpoints
    WHERE user_id=$1 AND name=$2;
  `;

  return pool.query(query, [userId, name]);
}

module.exports = {
  getEndpointsByUserId,
  createEndpoint,
  getEndpointByName,
  updateEndpoint,
  deleteEndpoint
};