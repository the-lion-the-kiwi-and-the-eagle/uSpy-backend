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

const addFriends = friend => {
  return Friends.create(friend);
}
const getFriends = userId => {
  return Friends.findAll({ where: { user_id: userId.user_id} })
}

module.exports = { saveUser, getUser, saveScore, getScore, addFriends, getFriends };
