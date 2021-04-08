const bcrypt = require('bcrypt');
const saltRounds = 10;

const checkPassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

const hashPassword = (password) => {
  return bcrypt.hash(password, saltRounds);
};

module.exports = {
  checkPassword,
  hashPassword
};