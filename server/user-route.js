const express = require('express');
const app = express();

const helpers = require('../database/db-helpers');

const bodyParser = require('body-parser')

app.use(bodyParser.json());


const router = express.Router();


// app.post('/user', (req, res) => {
//     // res.send('POST handler for /api/user route.');
//     const user = req.body;
//     console.log(req.body);
//     console.log(helpers);
//     helpers
//       .saveUser(user)
//       .then((savedUser) => {
//           console.log(savedUser);
//       }).catch((err) => {
//           console.log(err);
//       });
    //   })
     
     
module.exports = router;



