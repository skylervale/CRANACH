const express = require('express');
const bodyParser = require('body-parser');
const elasticsearch = require('elasticsearch');
const fs = require('fs')
const Graphic = require('./elasticsearch/graphic_index').Graphic
const Painting = require('./elasticsearch/painting_index')
const app = express();
const graphics = require('./cda-graphics.real.de.json').items;
const routes = require('./routes/index.route');


app.use(bodyParser.urlencoded({extended: false}));

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


client.indices.exists({index: "cranach_graphic"}, (err, res, status) => {
    if (res) {
        console.log('index already exists');
    } else {
        client.indices.create(Graphic, (err, res, status) => {
            console.log(err, res, status);
        })
    }
})

client.count({index: 'cranach_graphic'}, function (err, resp) {
    console.log("count", resp.count)
    if (resp.count === 0) {
        const body = graphics.flatMap(doc => [{index: {_index: 'cranach_graphic'}}, doc])

        client.bulk({
            body: body
        }, function (err, resp) {
            console.log(resp)
            if (err) {
                console.log(JSON.stringify(resp, null, '\t'));
            }
        });
    }
})

app.get('/', (req, res) => res.send('Hello World!'))
app.use(routes);

app.listen(9000, () => console.log(`server app listening at http://localhost:9000`));
