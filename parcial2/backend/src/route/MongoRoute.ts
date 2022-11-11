import { Router } from "express";
import MongoController from "../controller/MongoController";

class MongoRoute{

    public router: Router;
    private controller: MongoController;

    constructor(){
        this.router = Router();
        this.controller = new MongoController();
        this.config();
    }

    private config = () => {
        this.router.get('/products', this.controller.getProducts);
        this.router.post('/search', this.controller.searchProducts);
        this.router.post('/filter', this.controller.filterPriceProducts);
        this.router.post('/getProductsById', this.controller.getProductsById);
        this.router.post('/getCart', this.controller.getProductsCart);
        this.router.post('/getProductById', this.controller.getProductById);
    }
}

export default MongoRoute;