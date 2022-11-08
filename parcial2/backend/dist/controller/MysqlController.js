"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MysqlModel_1 = __importDefault(require("../model/MysqlModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt = require('jsonwebtoken');
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
                                const token = jwt.sign({ userId: email, password: password }, process.env.TOKEN_KEY, { expiresIn: "2h" });
                                return res.header('authorization', token).json(rows);
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
            const token = req.body.token;
            if (token) {
                let decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
                if (!decodedToken.email) {
                    return res.json({ 'error': true, message: 'e104' });
                }
                if (!id) {
                    return res.json({ 'error': true, message: 'e101' });
                }
                this.model.searchFavorites(id, decodedToken.email, (error, rows) => {
                    if (error) {
                        console.error(error);
                        return res.json({ 'error': true, message: 'e101' });
                    }
                    if (rows.length > 0) {
                        let rows2 = this.deleteFavorites(id, decodedToken.email, res);
                        if (rows2) {
                            return res.json([{ 'error': false, message: 'Delete favorites success' }]);
                        }
                    }
                    else {
                        let rows2 = this.addFavorites(id, decodedToken.email, res);
                        if (rows2) {
                            return res.json([{ 'error': false, message: 'Add favorites success' }]);
                        }
                    }
                });
            }
            else {
                console.log('Token Inválido');
                return res.json({ 'error': true, message: 'e104' });
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
            jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
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
                            const token = jwt.sign({ email: email, password: password }, process.env.TOKEN_KEY, { expiresIn: "2h" });
                            return res.header('authorization', token).json({ error: false, message: 'Inicio de sesión exitoso', token: token });
                        }
                        else {
                            return res.json({ error: true, message: 'e102' });
                        }
                    }
                    else {
                        return res.json({ error: true, message: 'e103' });
                    }
                });
            }
            else {
                res.json({ error: true, message: 'e101' });
            }
        };
        this.moviesModel = new MysqlModel_1.default();
        this.model = new MysqlModel_1.default();
    }
}
exports.default = MysqlController;
