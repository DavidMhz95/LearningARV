'use strict'
var validator = require('validator');
var fs = require('fs');
var path = require('path');
var Article = require('../models/article');


var controller = {
    datosCurso: function(req, res) {
        var hey = req.body.hola;
        return res.status(200).send({
            curso: 'Frameworks JS',
            autor: 'Victor robles web',
            hey
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy el rest del controlador de articulos'
        });
    },

    save: (req, res) => {
        //Recoger los parámetros por post
        var params = req.body;

        //Validar datos (validator)
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_title && validate_content) {
            //Crear objeto a guardar
            var article = new Article();
            //Asignar valores al objeto
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            //Guardar
            article.save((err, articleStored) => {

                if (err || !articleStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Los datos no se han guardado'
                    });

                }

                //Devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                });
            })

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }

    },

    getArticles: (req, res) => {

        var query = Article.find({})

        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(5)
        }
        //Find
        query.sort('-_id').exec((err, articles) => {

            if (err) {
                return res.status(200).send({
                    status: 'error',
                    message: 'Error al devolver los articulos '
                });
            }

            if (!articles) {
                return res.status(200).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar '
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });

        })

    },

    getArticle: (req, res) => {

        //Recoger el id de la url
        var articleId = req.params.id;

        //Comprobar que no es null
        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el articulo '
            });
        }

        //Buscar el articulo 
        Article.findById(articleId, (err, article) => {

            if (err || !article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo '
                });
            }
            //Devolverlo en json
            return res.status(200).send({
                status: 'success',
                article
            });
        })
    },

    update: (req, res) => {

        //Recoger el id del articulo url
        var articleId = req.params.id;

        //Recoger los datos
        var params = req.body;

        //Validar datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_title && validate_content) {
            //Find and update
            Article.findOneAndUpdate({ _id: articleId }, params, { new: true }, (err, articleUpdated) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }
                if (!articleUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    articleUpdated
                });

            })
        } else {
            return res.status(404).send({
                status: 'error',
                message: 'Validacion no es correcta'
            });
        }
    },

    delete: (req, res) => {

        //Recoger el id de la url
        var articleId = req.params.id;

        // Find and delete
        Article.findOneAndDelete({ _id: articleId }, (err, articleRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                });
            }

            if (!articleRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el articulo'
                });
            }

            return res.status(200).send({
                status: 'success',
                message: 'Articulo borrado'
            });
        });

    },

    upload: (req, res) => {
        //Configurar el modulo del connect muyltiparty router/article.js (done)
        //Recoger el fichero de la peticion 
        var fileName = 'Imagen no subida';
        var articleId = req.params.id;

        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: fileName
            });
        }
        //Conseguir el nombre y la extension del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        // * ADVERTENCIA* EN LINUX O MAC
        // var file_split = file_path.split('\'); <-- Una sola barra

        //Nombre del archivo 
        var file_name = file_split[2];

        //Extension del fichero
        var extension_split = file_name.split('.');
        var file_ext = extension_split[1];

        //Comprobar la extension, solo imagenes si no es valida borrar el fichero
        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            //borrar el archivo
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'La extesion no es valida'
                });
            })
        } else {
            //Si todo es valido

            //Buscar el articulo, asignarle el nombre de la imagen y actualizar
            Article.findOneAndUpdate({ _id: articleId }, { image: file_name }, { new: true }, (err, articleUpdated) => {
                if (err || !articleUpdated) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al guardar la imagen'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });
            })
        }
    },

    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/articles/' + file;

        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe'
                });
            }
        })
    },

    search: (req, res) => {
        //Sacar el string a buscar
        var searchString = req.params.search;
        console.log(searchString)
            //Find or
        Article.find({
                "$or": [
                    { "title": { "$regex": searchString, "$options": "i" } },
                    { "content": { "$regex": searchString, "$options": "i" } }
                ]
            })
            .sort([
                ['date', 'descending']
            ])
            .exec((err, articles) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        messsage: 'Error en la peticion'
                    });
                }
                if (!articles || articles.length <= 0) {
                    return res.status(404).send({
                        status: 'error',
                        messsage: 'No hay articulos que coincidan con tu busqueda'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    articles
                });
            })



    }



};

module.exports = controller;