import { Request, Response } from "express";
import MongoModel from "../model/ProductModel";

class MongoController {

    private model: MongoModel

    constructor() {
        this.model = new MongoModel();
    }

    public getProducts = (req: Request, res: Response) => {
        this.model.getProducts((products: any) => {
            res.json(products);
        });
    }

    public searchProducts = (req: Request, res: Response) => {
        this.model.searchProducts(req.body.query, (products: any) => {
            res.json(products);
        });
    }
}

export default MongoController;