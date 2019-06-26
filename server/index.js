
const express = require('express');
const app = express();
const vision = require('@google-cloud/vision');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const bodyParser = require('body-parser');


app.use(bodyParser.json({limit: '50mb'}));
app.get('/', function (req, res) {
    res.send('Hello World')
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

app.listen(8080, '127.0.0.1', () => {
    console.log('Server is connected');
});


    