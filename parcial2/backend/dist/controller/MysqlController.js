"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MysqlModel_1 = __importDefault(require("../model/MysqlModel"));
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
        this.signIn = (req, res) => {
            const { email, password } = req.body;
            if (email && password) {
                this.model.searchUser(email, (error, rows) => {
                    if (error) {
                        console.error(error);
                        return res.json({ error: true, message: 'e101' });
                    }
                    if (rows.length > 0) {
                        return res.json({ error: true, message: 'e103' });
                    }
                    else {
                        console.log(email);
                        console.log(password);
                    }
                });
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
