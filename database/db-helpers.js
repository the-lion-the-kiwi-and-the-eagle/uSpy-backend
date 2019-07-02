const Sequelize = require('sequelize');
const { Users, Friends, Scoreboard } = require('./index');


const saveUser = user => {
  Users.create(user);
}

const saveScore = score => {
  Scoreboard.create(score);
}

const getUser = (friend, user) => {
  return Users.findAll({ where: { email: friend.email } })
  //[Op.or]: [{email: friend.email}, {email: user.email}]
  .then(user => {
    console.log(user[0].id)
    addFriends({friend_id: user[0].id});
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
