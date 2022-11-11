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
                            return res.json(rows);
                        }
                    });
                }
            });
        } else {
            res.json({ error: true, message: 'e101' });
        }
    }

    public generateToken = (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (email && password && email.length > 0 && password.length > 0) {
            const token = jwt.sign(
                { email: email, password: password },
                process.env.TOKEN_KEY,
                { expiresIn: "2h" }
            );
            return res.header('authorization', token).json({ error: false, message: 'Inicio de sesión exitoso', token: token });
        }
        return res.json({ error: true, message: 'e102' });
    }

    public isLogged = (req: Request, res: Response) => {
        const token = req.body.token;
        if (token) {
            let decodedToken: any;
            try {
                decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
            } catch {
                return res.json({ 'error': true, message: 'e104' });
            }
            if (!decodedToken.email) {
                return res.json({ 'error': true, message: 'e104' });
            }
            return res.json({ 'error': false, message: 'Token valid' });
        }
    }

    public showFavorites = (req: Request, res: Response) => {
        const token = req.body.token;
        if (!this.verifyToken(token)) {
            return res.json({ 'error': true, message: 'e104' });
        }
        let decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        this.model.showFavorites(decodedToken.email, (error: any, rows: any) => {
            if (error) {
                console.error(error);
                return res.json({ 'error': true, message: 'e101' });
            }
            if (rows) {
                return res.json(rows);
            }
        });
    }

    public getCartId = (req: Request, res: Response) => {
        const token = req.body.token;
        if (!this.verifyToken(token)) {
            return res.json({ 'error': true, message: 'e104' });
        }
        let decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        this.model.getCartId(decodedToken.email, (error: any, rows: any) => {
            if (error) {
                console.error(error);
                return res.json({ 'error': true, message: 'e101' });
            }
            if (rows) {
                return res.json(rows);
            }
        });
    }

    public addToCart = (req: Request, res: Response) => {
        const id = parseInt(req.body.id);
        const token = req.body.token;
        if (!this.verifyToken(token)) {
            return res.json({ 'error': true, message: 'e104' });
        }
        if (!id) {
            return res.json({ 'error': true, message: 'e101' });
        }
        let decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        this.model.searchCart(id, decodedToken.email, (error: any, rows: any) => {
            if (error) {
                console.error(error);
                return res.json({ 'error': true, message: 'e101' });
            }
            if (rows.length == 0) {
                this.model.insertToCart(id, decodedToken.email, (error: any, rows: any) => {
                    if (error) {
                        console.log(error);
                        return res.json({ 'error': true, message: 'e101' });
                    }
                    if (rows) {
                        return res.json({ 'error': false, message: 'Success add to cart' });
                    }
                })
            }
            if (rows.length > 0) {
                this.model.addToCart(id, 1, decodedToken.email, (error: any, rows: any) => {
                    if (error) {
                        console.log(error);
                        return res.json({ 'error': true, message: 'e101' });
                    }
                    if (rows.length > 0) {
                        return res.json({ 'error': false, message: 'Success add to cart' });
                    }
                })
            }
        });

    }

    public searchFavorites = (req: Request, res: Response) => {
        const id = parseInt(req.body.id);
        const token = req.body.token;
        console.log('aquiii');
        console.log(token);
        if (!this.verifyToken(token)) {console.log('aquiii4');
            return res.json({ 'error': true, message: 'e104' });
        }
        console.log('aquiii2');
        if (!id) {
            return res.json({ 'error': true, message: 'e101' });
        }
        console.log('aquiii3');
        let decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
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

    public makeOrder = (req: Request, res: Response) => {
        const { token, cart, totalPrice } = req.body;
        if (!this.verifyToken(token)) {
            return res.json({ 'error': true, message: 'e104' });
        }
        if (!cart || cart.length == 0 || totalPrice == 0) {
            return res.json({ 'error': true, message: 'e101' });
        }
        let decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        this.model.makeOrder(decodedToken.email, totalPrice, (error: any, rows: any) => {
            if (error) {
                console.log(error);
                return res.json({ error: true, message: 'e101' });
            }
            if (rows) {
                return res.json(rows);
            }
        })
    }

    public deleteProductCart = (req: Request, res: Response) => {
        const id = parseInt(req.body.id);
        const token = req.body.token;
        if (!this.verifyToken(token)) {
            return res.json({ 'error': true, message: 'e104' });
        }
        if (!id) {
            return res.json({ 'error': true, message: 'e101' });
        }
        let decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        this.model.deleteProductCart(id, decodedToken.email, (error: any, rows: any) => {
            if (error) {
                console.error(error);
                return res.json({ 'error': true, message: 'e101' });
            }
            if (rows) {
                return res.json({ 'error': false, message: 'Success delete product' });
            }
        });
    }

    verifyToken(token: string): boolean {
        if (token) {
            let decodedToken: any;
            try {
                decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
            } catch {
                return false;
            }
            if (!decodedToken.email) {console.log('aquiii5');
                return false;
            }
            return true;
        } else {
            return false;
        }
    }
}
