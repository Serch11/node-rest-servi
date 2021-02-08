require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 3000;

//midleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/usuario', (req, res) => {
    res.json("get usuario");
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    if(body.nombre === undefined){
        
        res.status(400).json({
            ok:false,
            mensaje:"El nombre es necesario"
        });
    }

    res.json({
        persona: body
    });
});

app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    res.json({
        mensage: "put usuario", id: id
    });
});

app.delete('/usuario', (req, res) => {
    res.json("delete usuario");
});




app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo localhost:",process.env.PORT);
})