const express = require('express');
const bodyParser = require('body-parser');
const elasticsearch = require('elasticsearch');
const fs = require('fs')
const Graphic = require('./elasticsearch/graphic_index').Graphic
const Painting = require('./elasticsearch/painting_index').Painting
const app = express();
const graphics = require('./cda-graphics.real.de.json').items;
const paintings = require('./cda-paintings.de.json').items;
const routes = require('./routes/index.route');
const cors = require('cors');



app.use(bodyParser.urlencoded({extended: false}));

const client = new elasticsearch.Client({
    host: 'cranach_elasticsearch:9200',
    apiVersion: '7.x',
});
client.ping({
    requestTimeout: 3000
}, function (error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        console.log('elasticsearch is running');
    }
});
const indices = [{
    name: "cranach_graphic",
    mapping: Graphic,
    data: graphics
    },
    {
    name: "cranach_painting",
    mapping: Painting,
    data: paintings
    }]
indices.forEach(index => {
    console.log(index.name)
    client.indices.exists({index: index.name}, (err, res, status) => {
        if (res) {
            console.log('index already exists', index.name);
        } else {
            client.indices.create(index.mapping, (err, res, status) => {
                console.log(err, res, status);
            })
        }
    })
    client.count({index: index.name}, function (err, resp) {
        console.log("count", resp.count)
        if (resp.count === 0) {
            const body = index.data.flatMap(doc => [{index: {_index: index.name}}, doc])
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

})

app.use(cors());
app.get('/', (req, res) => res.send('Hello World!'))
app.use(routes);
app.listen(9000, () => console.log(`server app listening at http://localhost:9000`));
