const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Users, Friends, Scoreboard } = require('./index');


const saveUser = user => {
  Users.create(user);
}

const saveScore = score => {
  Scoreboard.create(score);
}

const getUser = (friend, user) => {
  return Users.findAll({ where: { [Op.or]: [{email: friend}, {email: user}] } })
  .then(user => {
    console.log(user[0], user[1], user)
    addFriends({user_id: user[0].id, friend_id: user[1].id});
  })
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
