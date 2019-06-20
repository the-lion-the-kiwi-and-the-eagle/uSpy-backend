// this is where the database connection will happen
const Sequelize = require('sequelize');
const dummyUserData = require('./dummy-user-data');
const dummyFriendData = require('./dummy-friend-data');


    const host = process.env.DB_HOST || 'localhost';
    const user = process.env.DB_USER || 'root';
    const port = process.env.DB_PORT || 3306;
    const password = process.env.DB_PASSWORD || '';
    const database = process.env.DB_DATABASE || 'uSpy';

    const connection = new Sequelize(database, user, password, {
    dialect: 'mysql',
    host,
    port,
});
/**
 * Users is sequelize model that links to users table in our database
 * users model has name (string), username (string), and an email (string)
 */


const Users = connection.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  }
});
/**
 * Scoreboard is sequelize model that links to scoreboard table in our database
 * scoreboard user_id (foreign key pointing to Classes table ID) and friend_id (foreign key pointing to Classes table ID) 
 */

const Friends = connection.define('friends', {
    user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      friend_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      }
  
});

const Scoreboard = connection.define('scoreboard', {
  user_id: Sequelize.INTEGER,
  // user_id: {
  //           type: Sequelize.INTEGER,
  //           references: { model: 'users', key: 'id' },
  //         },
  win_count: Sequelize.INTEGER
});

/**
 * Function call that connects to database
 * If databse connection is successful, success message logged to console
 */

connection.sync({ force: false })
  .then((result) => {
    console.log(result, 'connected to', database);
    // Friends.bulkCreate(dummyFriendData)
    // .then(user => {
    //   console.log(user.dataValues);
    // }

    // saveUser({
    //   name: "Kalkidan",
    //   userName: "kalkidan",
    //   email:"Kalkdian@gmail.com"
    // })
    
    // Users.create({
    //   name: "Kalkidan",
    //   username: "kalkidan",
    //   email:"Kalkdian@gmail.com"
    // })
    // .then(user => {
    //   console.log(user.dataValues);
    // })
  })
  .catch((err) => {
    console.log(err, '!!!!!!!!!!!!!');
  });


module.exports.connection = connection;

module.exports = { Users, Scoreboard, Friends };


