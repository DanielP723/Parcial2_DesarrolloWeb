import { Router } from "express";
import MysqlController from "../controller/MysqlController";

class MysqlRoute{

    public router: Router;
    private controller: MysqlController;

    constructor(){
        this.router = Router();
        this.controller = new MysqlController();
        this.config();
    }

    private config = () => {
        this.router.post('/addUser', this.controller.addUser);
        this.router.post('/searchFavorites', this.controller.searchFavorites);
        this.router.post('/signIn', this.controller.signIn);
        this.router.post('/showFavorites', this.controller.showFavorites);
        this.router.post('/isLogged', this.controller.isLogged);
        this.router.post('/addToCart', this.controller.addToCart);
        this.router.post('/getCartId', this.controller.getCartId);
        this.router.post('/makeOrder', this.controller.makeOrder);
        this.router.post('/deleteProductCart', this.controller.deleteProductCart);
        this.router.post('/generateToken', this.controller.generateToken);
    }
}

export default MysqlRoute;