import { CartModel } from "src/model/CartModel";
import { CartView } from "src/view/CartView";

export class CartController{
    private model: CartModel;
    private view: CartView;

    constructor(view: CartView, model: CartModel){
        this.view = view;
        this.model = model;
    }
}