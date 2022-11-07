import { NextFunction, Request, Response } from "express";
import MysqlModel from "../model/MysqlModel";

const jwt = require('jsonwebtoken'); //importando la libreria para generar token
const TOKEN_KEY = "x4TvErxRETbVcqaLl5dqMI115eN1p5y" //llave para poder generar el token

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
    

    public searchFavorites = (req: Request, res: Response) => {
        const id = parseInt(req.body.id);
        const email = req.body.email;
        if (id && email) {
            this.model.searchFavorites(id, email, (error: any, rows: any) => {
                if (error) {
                    console.error(error);
                    return res.json({ 'error': true, message: 'e101' });
                }
                if (rows.length > 0) {
                    let rows2: any = this.deleteFavorites(id, email, res);
                    if (rows2) {
                        return res.json([{ 'error': false, message: 'Delete favorites success' }]);
                    }
                } else {
                    let rows2: any = this.addFavorites(id, email, res);
                    if (rows2) {
                        return res.json([{ 'error': false, message: 'Add favorites success' }]);
                    }
                }
            });
        } else {
            return res.json({ 'error': true, message: 'e101' });
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
    public verificarToken = (req: Request, res: Response, next: NextFunction) =>{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split('')[1];
        console.log(authHeader);
        if(token==null)
            return res.status(401).send("Token requerido");
        jwt.verify(token, TOKEN_KEY, (err:any, user:any) =>{
            if(err) return res.status(403).send("Token invalido");
            req.user = user;
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
                if (rows.length > 0) {
                    console.log(email);
                    console.log(password);
                    //return res.json({ error: true, message: 'e103' });
                }else{
                    console.log('Usuario no encontrado');
                }
            });
            //SE GENERA EL TOKEN DEL USUARIO (se coloca en la parte que se se realice la validacion del login)
            const token = jwt.sign(
                {userId: email, password: password},
                TOKEN_KEY,
                {expiresIn: "2h"}
            );
            
        } else {
            res.json({ error: true, message: 'e101' });
        }
    }

    public getMovies = (request: Request, response: Response) => {
        this.moviesModel.getMovies(this.moviesModel.limit(parseInt(request.params.page), 10), (error: any, rows: any) => {
            if (error) {
                console.error(error);
                return response.json({ error: true, message: 'e101' });
            }
            if (rows) {
                return response.json(rows);
            } else {
                return response.status(404).json({ error: false, message: 'Movies not found' });
            }
        });
    }

    public getMovie = (request: Request, response: Response) => {
        const id = parseInt(request.params.id);
        if (id) {
            this.moviesModel.getMovie(id, (error: any, rows: any) => {
                if (error) {
                    console.error(error);
                    return response.json({ error: true, message: 'e101' });
                }
                if (rows) {
                    return response.json(rows);
                } else {
                    return response.status(404).json({ error: false, message: 'Movie not found' });
                }
            });
        } else {
            return response.status(404).json({ error: false, message: 'Movie not found' });
        }
    }

    public updateTitleMovie = (request: Request, response: Response) => {
        if (request.body.data) {
            this.moviesModel.updateTitleMovie({ id: parseInt(request.body.data.id), title: request.body.data.title }, (error: any, rows: any) => {
                if (error) {
                    console.error(error);
                    return response.json({ error: true, message: 'e201' });
                } else {
                    return response.json({ error: false, message: 'Title update' });
                }
            });
        } else {
            return response.status(404).json({ error: false, message: 'Movie not found' });
        }
    }

}
