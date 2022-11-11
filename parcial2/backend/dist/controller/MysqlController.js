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
        this.generateToken = (req, res) => {
            const { email, password } = req.body;
            if (email && password && email.length > 0 && password.length > 0) {
                const token = jwt.sign({ email: email, password: password }, process.env.TOKEN_KEY, { expiresIn: "2h" });
                return res.header('authorization', token).json({ error: false, message: 'Inicio de sesión exitoso', token: token });
            }
            return res.json({ error: true, message: 'e102' });
        };
        this.isLogged = (req, res) => {
            const token = req.body.token;
            if (token) {
                let decodedToken;
                try {
                    decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
                }
                catch (_a) {
                    return res.json({ 'error': true, message: 'e104' });
                }
                if (!decodedToken.email) {
                    return res.json({ 'error': true, message: 'e104' });
                }
                return res.json({ 'error': false, message: 'Token valid' });
            }
        };
        this.showFavorites = (req, res) => {
            const token = req.body.token;
            if (!this.verifyToken(token)) {
                return res.json({ 'error': true, message: 'e104' });
            }
            let decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
            this.model.showFavorites(decodedToken.email, (error, rows) => {
                if (error) {
                    console.error(error);
                    return res.json({ 'error': true, message: 'e101' });
                }
                if (rows) {
                    return res.json(rows);
                }
            });
        };
        this.getCartId = (req, res) => {
            const token = req.body.token;
            if (!this.verifyToken(token)) {
                return res.json({ 'error': true, message: 'e104' });
            }
            let decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
            this.model.getCartId(decodedToken.email, (error, rows) => {
                if (error) {
                    console.error(error);
                    return res.json({ 'error': true, message: 'e101' });
                }
                if (rows) {
                    return res.json(rows);
                }
            });
        };
        this.addToCart = (req, res) => {
            const id = parseInt(req.body.id);
            const token = req.body.token;
            if (!this.verifyToken(token)) {
                return res.json({ 'error': true, message: 'e104' });
            }
            if (!id) {
                return res.json({ 'error': true, message: 'e101' });
            }
            let decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
            this.model.searchCart(id, decodedToken.email, (error, rows) => {
                if (error) {
                    console.error(error);
                    return res.json({ 'error': true, message: 'e101' });
                }
                if (rows.length == 0) {
                    this.model.insertToCart(id, decodedToken.email, (error, rows) => {
                        if (error) {
                            console.log(error);
                            return res.json({ 'error': true, message: 'e101' });
                        }
                        if (rows) {
                            return res.json({ 'error': false, message: 'Success add to cart' });
                        }
                    });
                }
                if (rows.length > 0) {
                    this.model.addToCart(id, 1, decodedToken.email, (error, rows) => {
                        if (error) {
                            console.log(error);
                            return res.json({ 'error': true, message: 'e101' });
                        }
                        if (rows.length > 0) {
                            return res.json({ 'error': false, message: 'Success add to cart' });
                        }
                    });
                }
            });
        };
        this.searchFavorites = (req, res) => {
            const id = parseInt(req.body.id);
            const token = req.body.token;
            console.log('aquiii');
            console.log(token);
            if (!this.verifyToken(token)) {
                console.log('aquiii4');
                return res.json({ 'error': true, message: 'e104' });
            }
            console.log('aquiii2');
            if (!id) {
                return res.json({ 'error': true, message: 'e101' });
            }
            console.log('aquiii3');
            let decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
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
        this.makeOrder = (req, res) => {
            const { token, cart, totalPrice } = req.body;
            if (!this.verifyToken(token)) {
                return res.json({ 'error': true, message: 'e104' });
            }
            if (!cart || cart.length == 0 || totalPrice == 0) {
                return res.json({ 'error': true, message: 'e101' });
            }
            let decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
            this.model.makeOrder(decodedToken.email, totalPrice, (error, rows) => {
                if (error) {
                    console.log(error);
                    return res.json({ error: true, message: 'e101' });
                }
                if (rows) {
                    return res.json(rows);
                }
            });
        };
        this.deleteProductCart = (req, res) => {
            const id = parseInt(req.body.id);
            const token = req.body.token;
            if (!this.verifyToken(token)) {
                return res.json({ 'error': true, message: 'e104' });
            }
            if (!id) {
                return res.json({ 'error': true, message: 'e101' });
            }
            let decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
            this.model.deleteProductCart(id, decodedToken.email, (error, rows) => {
                if (error) {
                    console.error(error);
                    return res.json({ 'error': true, message: 'e101' });
                }
                if (rows) {
                    return res.json({ 'error': false, message: 'Success delete product' });
                }
            });
        };
        this.moviesModel = new MysqlModel_1.default();
        this.model = new MysqlModel_1.default();
    }
    verifyToken(token) {
        if (token) {
            let decodedToken;
            try {
                decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
            }
            catch (_a) {
                return false;
            }
            if (!decodedToken.email) {
                console.log('aquiii5');
                return false;
            }
            return true;
        }
        else {
            return false;
        }
    }
}
exports.default = MysqlController;
