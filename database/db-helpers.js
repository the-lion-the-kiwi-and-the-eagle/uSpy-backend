const Sequelize = require('sequelize');
const { Users, Friends, Scoreboard } = require('./index');


const saveUser = user => {

  Users.create(user);
}

module.exports = { saveUser };
