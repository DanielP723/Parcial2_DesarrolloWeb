import { Request, Response } from "express";
import MysqlModel from "../model/MysqlModel";

export default class MysqlController {

    private moviesModel: MysqlModel;
    private model: MysqlModel;

    constructor() {
        this.moviesModel = new MysqlModel();
        this.model = new MysqlModel();
    }

    public addUser = (req: Request, res: Response) => {
        const {email, password, name, surname} = req.body;
        if(email && password && name && surname){
            this.model.addUser(email, password, name, surname, (error: any, rows: any) => {
                if(error){
                    console.error(error);
                    return res.json({ error: true, message: 'e101' });
                }
                if(rows){
                    return res.json(rows);
                }
            });
        }else{
            res.json({ error: true, message: 'e101' });
        }
    }

    public searchFavorites = (req: Request, res: Response) => {
        const id = parseInt(req.body.id);
        const email = req.body.email;
        if(id && email){
            this.model.searchFavorites(id, email, (error: any, rows: any) => {
                if(error){
                    console.error(error);
                    return res.json({ 'error': true, message: 'e101' });
                }
                if(rows.length > 0){
                    let rows2: any = this.deleteFavorites(id, email, res);
                    if(rows2){
                        return res.json([{'error': false, message: 'Delete favorites success'}]);
                    }
                } else {
                    let rows2: any = this.addFavorites(id, email, res);
                    if(rows2){
                        return res.json([{'error': false, message: 'Add favorites success'}]);
                    }
                }
            });
        }else{
            return res.json({ 'error': true, message: 'e101' });
        }
    }

    public deleteFavorites = (id: number, email: string, res: Response) => {
        if(id && email){
            this.model.deleteFavorites(id, email, (error: any, rows: any) => {
                if(error){
                    console.error(error);
                    return res.json({ error: true, message: 'e101' });
                }
                if(rows){
                    return res.json(rows);
                }
            });
        }else{
            res.json({ error: true, message: 'e101' });
        }
    }

    public addFavorites = (id: number, email: string, res: Response) => {
        if(id && email){
            this.model.addFavorites(id, email, (error: any, rows: any) => {
                if(error){
                    console.error(error);
                    return res.json({ error: true, message: 'e101' });
                }
                if(rows){
                    return res.json(rows);
                }
            });
        }else{
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
        if(request.body.data) {
            this.moviesModel.updateTitleMovie({id: parseInt(request.body.data.id), title: request.body.data.title}, (error: any, rows: any) => {
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