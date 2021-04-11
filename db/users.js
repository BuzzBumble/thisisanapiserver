const pool = require('./db');

const getUserByUsername = (username) => {
  const query = `
  SELECT * FROM users
      WHERE username=$1;
  `;

  return pool.query(query, [username]);
};

const createUser = (name, username, pwHash) => {
  const query = `
  INSERT INTO users (name, username, password)
    VALUES ($1, $2, $3)
      RETURNING id;
  `;

  return pool.query(query, [name, username, pwHash]);
};

const getUserById = (id) => {
  const query = `
  SELECT name, username FROM users
    WHERE id=$1;
  `;

  return pool.query(query, [id]);
};

const updateUser = (id, name, username) => {
  const query = `
  UPDATE users
    SET name=$1, username=$2
      WHERE id=$3
        RETURNING name, username;
  `;

  return pool.query(query, [name, username, id]);
};

const deleteUser = (id) => {
  const query = `
  DELETE FROM users
    WHERE id=$1;
  `;

  return pool.query(query, [id]);
};

module.exports = {
  getUserByUsername,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};