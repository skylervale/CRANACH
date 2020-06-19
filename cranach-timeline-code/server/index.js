const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Graphic = require('./Models/Graphic');
const elasticsearch = require('elasticsearch');
const fs = require('fs')




const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const client = new elasticsearch.Client({
    host: 'cranach_elasticsearch:9200',
    apiVersion: '7.x',
});
client.ping({
    requestTimeout: 1000
}, function (error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        console.log('elasticsearch is running');
    }
});

// Connect to MongoDB
mongoose
    .connect(
        'mongodb://cranach_mongodb:27017/db_cranach',
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

Graphic.createCollection().then(function(collection) {
    console.log('Collection is created!');
});

Graphic.countDocuments({}, function(err, c) {
    if (c === 0){
        fs.readFile('./cda-graphics.real.de.json', 'utf8', (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err)
                return
            }
            JSON.parse(jsonString).items.forEach(graphic => {
                let gr = new Graphic(graphic)
                gr.save(function(error) {
                    console.log('error', error)
                });
            })
        })
    }
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(9000, () => console.log(`server app listening at http://localhost:9000`));
