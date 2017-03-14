var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bc = require('bcryptjs');
var User = require('../models/user');
var express = require('express');
var router = express.Router();
var Categoria = require('../models/categoria');

router.post('/signup', function (req, res, next) {


    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password : bc.hashSync(req.body.password, 10),
        role: 'user'
    });

    user.save(function (err,result) {
        if(err){
            return res.status(500).json({
                title: 'An erro occurred',
                error: err
            });
        }

        res.status(201).json({
            message: 'User created',
            obj: result
        })
    })

});

router.post('/login', function (req, res, next) {
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            return res.status(500).json({
                title: 'An erro occurred',
                error: err
            });
        }

        if(!user){
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }

        if(!bc.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }

        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});

        res.status(200).json({
            message: 'login success!',
            token: token,
            role: user.role,
            userId: user._id
        });

    });
});

router.post('/update', function(req,res,next){

    var tk = req.body.token;
    try{
        var decoded = jwt.verify(tk, 'secret');

        if(!req.body.categoriaId) {

            if (!req.body.nome) {
                res.status(401).json({
                    message: "Informar nome da categoria! "
                })
            } else {

                var categoria = new Categoria({
                    nome: req.body.nome
                });

                categoria.save(function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An erro occurred',
                            error: err
                        });
                    }

                    res.status(201).json({
                        message: 'Categoria criada',
                        obj: result
                    })
                })
            }

        }else{

            if (!req.body.nome) {
                res.status(401).json({
                    message: "Informar nome da categoria! "
                })
            }else{

                var novaCategoria = new Categoria({
                    _id: req.body.categoriaId,
                    nome: req.body.nome
                });

                novaCategoria.produtos = req.body.produtos;

                var upsertData = novaCategoria.toObject();

                Categoria.update({_id: req.body.categoriaId}, upsertData, {upsert: true}, function (err, result) {

                    if(err){
                        console.log(err);
                        res.status(401).json({
                            message: "Erro ao atualizar categoria! "
                        })
                    }else{
                        res.status(200).json({
                            message: 'Categoria atualizada',
                            obj: result
                        })
                    }

                });

            }

        }
    }catch(err){
        res.status(401).json({
            message: "Token incorreto! "
        })
    }

});

router.get('/produtos', function(req,res,next){

    Categoria.find({}, function (err, cat) {

        if(err){
            console.log(err);
            res.status(200).json({
                message: "Não foi possivel recuperar os produtos"
            });
            return;
        }

        res.json({data: cat});

    });

});

module.exports = router;