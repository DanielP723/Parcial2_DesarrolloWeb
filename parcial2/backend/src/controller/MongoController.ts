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

    public filterPriceProducts = (req: Request, res: Response) => {
        this.model.filterPriceProducts(req.body.min, req.body.max, (products: any) => {
            res.json(products);
        });
    }

    public showFavorites = (req: Request, res: Response) => {
        let ids = req.body.ids;
        if (ids && ids.length > 0) {
            this.model.showFavorites(ids, (products: any) => {
                console.log(products);
                res.json(products);
            });
        }
    }
}

export default MongoController;