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

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.post('/user', (req, res) => {
  console.log(req);
    const user = req.body;
    console.log(req.body);
    console.log(helpers)
    helpers
      .saveUser(user)
    //   .then((savedUser) => {
    //       console.log(savedUser);
    //   }).catch((err) => {
    //       console.log(err);
    //   });
      })

      app.post('/friend', (req, res) => {
          const friend = req.body;
          console.log(req.body);
          helpers
            .getUser(friend, user)
            // .then((friend) => {
            //     console.log(friend);
            // }).catch((err) => {
            //     console.log(err);
            // });
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
    console.log(req.file);
    client
      .labelDetection(req.file.path)
      .then(results => {
        const labels = results[0].labelAnnotations;
    
        console.log('Labels:');
        labels.forEach(label => console.log(label.description));
      
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
})

app.listen(8080, '127.0.0.1', () => {
    console.log('Server is connected');
});


    