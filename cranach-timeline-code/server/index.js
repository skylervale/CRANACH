const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Graphic = require('./Models/Graphic')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));



// Connect to MongoDB
mongoose
    .connect(
        'mongodb://cranach_mongodb:27017/db_cranach',
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
// create a graphic with default values
const graphic = new Graphic({})
graphic.save();

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(9000, () => console.log(`server app listening at http://localhost:9000`));
