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
    }
}

export default MysqlRoute;