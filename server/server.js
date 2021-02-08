require('./config/config');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3000;
const express = require('express');
const app = express();


//midleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('../routes/usuario'));








mongoose.connect(process.env.URLDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, (err, res) => {
        if (err) throw err;
        console.log("Base de datos ONLINE");
    });

app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo localhost:", process.env.PORT);
})