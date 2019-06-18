// this is where the database connection will happen
const Sequelize = require('sequelize');
require('dotenv').config();

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

const Scoreboard = connection.define('scoreboard', {
    user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      friend_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      }
  
});

const Friends = connection.define('friends', {
  win_count: Sequelize.INTEGER,
});

connection.sync({ force: false })
  .then((result) => {
    console.log(result, 'connected to', database);
    // Users.bulkCreate(dummyUserData)
    // .then(user => {
    //   console.log(user.dataValues);
    // })
  })
  .catch((err) => {
    console.log(err, '!!!!!!!!!!!!!');
  });


module.exports.connection = connection;
module.exports.Scoreboard = Scoreboard;
module.exports.Users = Users;
module.exports.Friends = Friends;

