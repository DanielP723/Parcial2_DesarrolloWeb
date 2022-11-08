import { json, NextFunction, Request, Response } from "express";
import MysqlModel from "../model/MysqlModel";
import bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');

export default class MysqlController {

    private moviesModel: MysqlModel;
    private model: MysqlModel;

    constructor() {
        this.moviesModel = new MysqlModel();
        this.model = new MysqlModel();
    }

    public addUser = (req: Request, res: Response) => {
        const { email, password, name, surname } = req.body;
        if (email && password && name && surname) {
            this.model.searchUser(email, (error: any, rows: any) => {
                if (error) {
                    console.error(error);
                    return res.json({ error: true, message: 'e101' });
                }
                if (rows.length > 0) {
                    return res.json({ error: true, message: 'e103' });
                } else {
                    this.model.addUser(email, password, name, surname, (error: any, rows: any) => {
                        if (error) {
                            console.error(error);
                            return res.json({ error: true, message: 'e101' });
                        }
                        if (rows) {
                            const token = jwt.sign(
                                { userId: email, password: password },
                                process.env.TOKEN_KEY,
                                { expiresIn: "2h" }
                            );
                            return res.header('authorization', token).json(rows);
                        }
                    });
                }
            });
        } else {
            res.json({ error: true, message: 'e101' });
        }
    }

    public searchFavorites = (req: Request, res: Response) => {
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
            this.model.searchFavorites(id, decodedToken.email, (error: any, rows: any) => {
                if (error) {
                    console.error(error);
                    return res.json({ 'error': true, message: 'e101' });
                }
                if (rows.length > 0) {
                    let rows2: any = this.deleteFavorites(id, decodedToken.email, res);
                    if (rows2) {
                        return res.json([{ 'error': false, message: 'Delete favorites success' }]);
                    }
                } else {
                    let rows2: any = this.addFavorites(id, decodedToken.email, res);
                    if (rows2) {
                        return res.json([{ 'error': false, message: 'Add favorites success' }]);
                    }
                }
            });
        } else {
            console.log('Token Inválido')
            return res.json({ 'error': true, message: 'e104' });
        }
    }

    public deleteFavorites = (id: number, email: string, res: Response) => {
        if (id && email) {
            this.model.deleteFavorites(id, email, (error: any, rows: any) => {
                if (error) {
                    console.error(error);
                    return res.json({ error: true, message: 'e101' });
                }
                if (rows) {
                    return res.json(rows);
                }
            });
        } else {
            res.json({ error: true, message: 'e101' });
        }
    }

    public addFavorites = (id: number, email: string, res: Response) => {
        if (id && email) {
            this.model.addFavorites(id, email, (error: any, rows: any) => {
                if (error) {
                    console.error(error);
                    return res.json({ error: true, message: 'e101' });
                }
                if (rows) {
                    return res.json(rows);
                }
            });
        } else {
            res.json({ error: true, message: 'e101' });
        }
    }

    // SE VERIFICA EL TOKEN
    public verificarToken = (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split('')[1];
        console.log(authHeader);
        if (token == null)
            return res.status(401).send("Token requerido");
        jwt.verify(token, process.env.TOKEN_KEY, (err: any, user: any) => {
            if (err) return res.status(403).send("Token invalido");
            // req.user = user;
            next();
        })
    }
    public signIn = (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (email && password) {
            this.model.searchUser(email, (error: any, rows: any) => {
                if (error) {
                    console.error(error);
                    return res.json({ error: true, message: 'e101' });
                }
                if (rows.length == 1) {
                    let passwordEncrypt: any = rows[0].password;
                    if (bcrypt.compareSync(password, passwordEncrypt)) {
                        const token = jwt.sign(
                            { email: email, password: password },
                            process.env.TOKEN_KEY,
                            { expiresIn: "2h" }
                        );
                        return res.header('authorization', token).json({ error: false, message: 'Inicio de sesión exitoso', token: token });
                    } else {
                        return res.json({ error: true, message: 'e102' });
                    }
                } else {
                    return res.json({ error: true, message: 'e103' });
                }
            });
        } else {
            res.json({ error: true, message: 'e101' });
        }
    }
}
