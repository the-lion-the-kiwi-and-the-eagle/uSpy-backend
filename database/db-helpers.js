const Sequelize = require('sequelize');
const { Users, Friends, Scoreboard } = require('./index');


const saveUser = user => {

  Users.create(user);
}

const saveScore = score => {
  Scoreboard.create(score);
}

const getUser = user => {
  return Users.findAll({ where: { id: user.id } })
  .then(results => ({ user, allUsers: results }));
}

const getScore = userId => {
  return Scoreboard.findAll({ where: { user_id: userId} })
}

module.exports = { saveUser, getUser, saveScore, getScore };
