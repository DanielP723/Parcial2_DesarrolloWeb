"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MysqlModel_1 = __importDefault(require("../model/MysqlModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt = require('jsonwebtoken'); //importando la libreria para generar token
const TOKEN_KEY = "x4TvErxRETbVcqaLl5dqMI115eN1p5y"; //llave para poder generar el token
class MysqlController {
    constructor() {
        this.addUser = (req, res) => {
            const { email, password, name, surname } = req.body;
            if (email && password && name && surname) {
                this.model.searchUser(email, (error, rows) => {
                    if (error) {
                        console.error(error);
                        return res.json({ error: true, message: 'e101' });
                    }
                    if (rows.length > 0) {
                        return res.json({ error: true, message: 'e103' });
                    }
                    else {
                        this.model.addUser(email, password, name, surname, (error, rows) => {
                            if (error) {
                                console.error(error);
                                return res.json({ error: true, message: 'e101' });
                            }
                            if (rows) {
                                return res.json(rows);
                            }
                        });
                    }
                });
            }
            else {
                res.json({ error: true, message: 'e101' });
            }
        };
        this.searchFavorites = (req, res) => {
            const id = parseInt(req.body.id);
            const email = req.body.email;
            if (id && email) {
                this.model.searchFavorites(id, email, (error, rows) => {
                    if (error) {
                        console.error(error);
                        return res.json({ 'error': true, message: 'e101' });
                    }
                    if (rows.length > 0) {
                        let rows2 = this.deleteFavorites(id, email, res);
                        if (rows2) {
                            return res.json([{ 'error': false, message: 'Delete favorites success' }]);
                        }
                    }
                    else {
                        let rows2 = this.addFavorites(id, email, res);
                        if (rows2) {
                            return res.json([{ 'error': false, message: 'Add favorites success' }]);
                        }
                    }
                });
            }
            else {
                return res.json({ 'error': true, message: 'e101' });
            }
        };
        this.deleteFavorites = (id, email, res) => {
            if (id && email) {
                this.model.deleteFavorites(id, email, (error, rows) => {
                    if (error) {
                        console.error(error);
                        return res.json({ error: true, message: 'e101' });
                    }
                    if (rows) {
                        return res.json(rows);
                    }
                });
            }
            else {
                res.json({ error: true, message: 'e101' });
            }
        };
        this.addFavorites = (id, email, res) => {
            if (id && email) {
                this.model.addFavorites(id, email, (error, rows) => {
                    if (error) {
                        console.error(error);
                        return res.json({ error: true, message: 'e101' });
                    }
                    if (rows) {
                        return res.json(rows);
                    }
                });
            }
            else {
                res.json({ error: true, message: 'e101' });
            }
        };
        // SE VERIFICA EL TOKEN
        this.verificarToken = (req, res, next) => {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split('')[1];
            console.log(authHeader);
            if (token == null)
                return res.status(401).send("Token requerido");
            jwt.verify(token, TOKEN_KEY, (err, user) => {
                if (err)
                    return res.status(403).send("Token invalido");
                // req.user = user;
                next();
            });
        };
        this.signIn = (req, res) => {
            const { email, password } = req.body;
            if (email && password) {
                this.model.searchUser(email, (error, rows) => {
                    if (error) {
                        console.error(error);
                        return res.json({ error: true, message: 'e101' });
                    }
                    if (rows.length == 1) {
                        let passwordEncrypt = rows[0].password;
                        if (bcryptjs_1.default.compareSync(password, passwordEncrypt)) {
                            return res.json({ error: false, message: 'Inicio de sesión exitoso' });
                        }
                        else {
                            return res.json({ error: true, message: 'e102' });
                        }
                    }
                    else {
                        return res.json({ error: true, message: 'e103' });
                    }
                });
                //SE GENERA EL TOKEN DEL USUARIO (se coloca en la parte que se se realice la validacion del login)
                const token = jwt.sign({ userId: email, password: password }, TOKEN_KEY, { expiresIn: "2h" });
            }
            else {
                res.json({ error: true, message: 'e101' });
            }
        };
        this.getMovies = (request, response) => {
            this.moviesModel.getMovies(this.moviesModel.limit(parseInt(request.params.page), 10), (error, rows) => {
                if (error) {
                    console.error(error);
                    return response.json({ error: true, message: 'e101' });
                }
                if (rows) {
                    return response.json(rows);
                }
                else {
                    return response.status(404).json({ error: false, message: 'Movies not found' });
                }
            });
        };
        this.getMovie = (request, response) => {
            const id = parseInt(request.params.id);
            if (id) {
                this.moviesModel.getMovie(id, (error, rows) => {
                    if (error) {
                        console.error(error);
                        return response.json({ error: true, message: 'e101' });
                    }
                    if (rows) {
                        return response.json(rows);
                    }
                    else {
                        return response.status(404).json({ error: false, message: 'Movie not found' });
                    }
                });
            }
            else {
                return response.status(404).json({ error: false, message: 'Movie not found' });
            }
        };
        this.updateTitleMovie = (request, response) => {
            if (request.body.data) {
                this.moviesModel.updateTitleMovie({ id: parseInt(request.body.data.id), title: request.body.data.title }, (error, rows) => {
                    if (error) {
                        console.error(error);
                        return response.json({ error: true, message: 'e201' });
                    }
                    else {
                        return response.json({ error: false, message: 'Title update' });
                    }
                });
            }
            else {
                return response.status(404).json({ error: false, message: 'Movie not found' });
            }
        };
        this.moviesModel = new MysqlModel_1.default();
        this.model = new MysqlModel_1.default();
    }
}
exports.default = MysqlController;
