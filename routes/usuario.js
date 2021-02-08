const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('./../server/models/usuario.js');

app.get('/usuario', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }) //'nombre email estado google rol' una forma de filtrar datos;
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) return res.status(400).json({ ok: false, err: err });

            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                if (err) return res.status(400).json({ ok: false, err })
                return res.status(200).json({ ok: true, usuarios: usuarios, cuantos: conteo });
            })
        })
});


app.post('/usuario', (req, res) => {
    let body = req.body;
    //console.log(req.body)

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol,
        estado: body.estado,
        google: body.google
    });

    usuario.save((err, usuarioDB) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        return res.json({
            ok: true,
            usuarioDB
        })
    })
});

app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body
    console.log(body);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) return res.status(400).json({ ok: false,err:err});

        res.status(200).json({ ok: true, usuarioDB: usuarioDB })

    })

});

app.delete('/usuario/:id', (req, res) => {

    let id = req.params.id;
    let estado = false;
    let body = estado;
    Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {

        if (err) return res.status(400).json({ ok: false, err });
        if (!usuarioDB) return res.status(400).json({ ok: false, message: 'Usuario no encontrado' })
        res.status(200).json({ ok: true, usuarioDB })
    })
});


module.exports = app;