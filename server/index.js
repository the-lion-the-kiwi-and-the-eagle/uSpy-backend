const express = require('express');
const app = express();
const vision = require('@google-cloud/vision');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'})

app.get('/', function (req, res) {
    res.send('Hello World')
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

app.listen(3000, '127.0.0.1', () => {
    console.log('Server is connected');
});


    