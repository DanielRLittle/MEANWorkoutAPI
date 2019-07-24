var mongoose = require('mongoose');
var express = require('express');
var config = require('./config');
var userPath = require('./router/UserPath');
var schema = require('./schemas/Schemas');
var cors = require ('cors');
var app = express();

app.use(cors({origin: true}));

app.use(express.json());

app.use('/user', userPath);

app.use((err, req, res, next) => {
    if (config.app.logErrors) {
        console.error(err);
    }
    return res.status(500).send(err);
});

mongoose.connect(
    config.app.MONGODB_URI,
    { useNewUrlParser: true })
    .then((res) => {
        console.log('Connection to MongoDB established!');
    }, (error) => {
        console.log('Connection to MongoDB failed, exiting.');
        console.log(error);
        process.exit(1);
    }).then(() =>{
        app.listen(config.app.PORT, () => {
            console.log(`Server running on port ${config.app.PORT}`);
        });
    });