require('dotenv').config();
const express = require('express');
const db = require('../database/index')
const app = express();
const vision = require('@google-cloud/vision');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'})
const userRoute = require('./user-route');
const helpers = require('../database/db-helpers');
const bodyParser = require('body-parser')
let http = require('http');
let server = http.Server(app);
let socketIO = require('socket.io');

let io = socketIO(server);


app.use(bodyParser.json());

app.use(bodyParser.json({limit: '50mb'}));
app.get('/', function (req, res) {
    res.send('Hello World')
})

app.post('/user', (req, res) => {
    const user = req.body;
    console.log(req.body);
    console.log(helpers)
    helpers
      .saveUser(user)
     
      })

      app.get('/user', (req, res) => {
        const id = req.body;
        console.log(req.body.id);
        console.log(helpers)
        helpers
          .getUser(id)
          .then((getUser) => {
              console.log(getUser);
              res.send(getUser);
          }).catch((err) => {
              console.log(err);
          });
          })
     
      app.post('/score', (req, res) => {
        const score = req.body;
        console.log(req.body);
        helpers
          .saveScore(score)
          .then((savedScore) => {
              console.log(savedScore);
          }).catch((err) => {
              console.log(err);
          });
          })

          app.get('/score', (req, res) => {
            const user = req.body;
            console.log(req.body);
            helpers
              .getScore(user.user_id)
              .then((score) => {
                  console.log(score);
                  res.send(score);
              }).catch((err) => {
                  console.log(err);
              });
              })

              app.post('/friends', (req, res) => {
                const friend = req.body;
                console.log(req.body);
                helpers
                  .addFriends(friend)
                  .then((savedScore) => {
                      console.log(savedScore);
                  }).catch((err) => {
                      console.log(err);
                  });
                  })
              
           app.get('/friends', (req, res) => {
            const user = req.body;
            console.log(req.body);
            helpers
              .getFriends(user)
              .then((user) => {
                  let friends = user.map(user => user.friend_id)
                  console.log(friends);
                  res.send(friends);
              }).catch((err) => {
                  console.log(err);
              });
              })

// Creates a client
const client = new vision.ImageAnnotatorClient({
    keyFilename: 'APIKey.json' 
});

// Performs label detection on the image file
app.post('/image', upload.single('image'), (req, res, next) => {
   
  const request = {
    image: {
      content: Buffer.from(req.body.requests[0].image.content, 'base64'),
    }
  }
    client
      .labelDetection(request)
      .then(results => {
        const labels = results[0].labelAnnotations;
        // sending an array of objects containing image.description and image.score
        res.send(labels);
      })
      .catch((err) => {
        err;
        //console.error('ERROR:', err);
      });
})
// contains all socket connections connected to users email i.e sockets['sam@sam.com'] = socketId
let socketIds = {};

// contains all rooms created by host user i.e games['sam@sam.com'] = {gameName: 'Sam'}
let games = {};

io.on('connection', (socket) => {
  console.log('user connected to socket', socket.id);
  
  socket.emit('user', 'give me email pls');  
  socket.on('user', (credentials) => {
    // save socket id to email
    let email = credentials.email
    if (!socketIds[email]) {
      socketIds[email] = socket.id;
    }
    console.log("these are the socket ids of users connected:" + socketIds);
  })
  // create room when user creates game using email as room name 
  socket.on('create game', (hostEmail) => {
    console.log("this is the email of the user that created a game:   " + hostEmail);
    // broadcast to all online users a game has been created, shown in lobby.compnent
    io.emit('game created', hostEmail);
    console.log('i emitted this to everyone');
    // save room instance in game object assigned to host's email
    if (!games[hostEmail]) {
      games[hostEmail] = {game: hostEmail};
      socket.join(hostEmail);
    
      
    }
    console.log(games);
  })
  socket.on('refresh games', (games) => {
    console.log(games);
    io.emit('refreshed list', games);
  })

  socket.on('user joined', (emails) => {
   games[emails.playerEmail] = games[emails.hostEmail];
    // console.log(games);
    socket.join(games[emails.hostEmail].game);
    console.log(socket.rooms);
    io.to(games[emails.hostEmail].game).emit('join', `you have joined ${emails.hostEmail}'s game`);
  })
  
  socket.on('items', (list) => {
    console.log(list);
    io.to(games[list.username].game).emit('render list', list.list);
  })

  socket.on('correct1', (yes) => {
    console.log(yes);
    socket.broadcast.emit('they scored5', yes.correct);
  })

  socket.on('correct2', (yes) => {
    console.log(yes);
    socket.broadcast.emit('they scored6', yes.correct);
  })

  socket.on('correct3', (yes) => {
    console.log(yes);
    socket.broadcast.emit('they scored7', yes.correct);
  })

  socket.on('correct4', (yes) => {
    console.log(yes);
    socket.broadcast.emit('they scored8', yes.correct);
  })
});

server.listen(8080, '127.0.0.1', () => {
    console.log('Server is connected');
});


   

//Backend Socket logic

/* CONNECTION
* 
* Connection is made when user connects to application.
* We save users socketId in an object with the key being their emails.
*/ 
/* CREATE GAME 
* When a user creates a game, we save the game name in a games object with that users email.
* Games created are broadcasted to all users online, shown on the front-end as a lobby page listing all available games


const games = {}
  
socket.on('create', (hostEmail) => {
    
    socket.broadcast.emit('new game created', hostEmail)
    
    games[hostEmail] = {game: hostEmail}
    
    socket.join(hostEmail)
})
 

***** Users press join button to 'accept invite' into game. ******

socket.on('join game', (hostEmail, newPlayerEmail) => {
    socket.broadcast.to(socketsId[newPlayerEmail]).emit('joined game', hostEmail)
  
***** Add the new player to the games object pointing to the hostEmail?? ******
  
  games[hostEmail] = games[newPlayerEmail];
  socket.join(games[newPlayerEmail].gameName)
})


*/