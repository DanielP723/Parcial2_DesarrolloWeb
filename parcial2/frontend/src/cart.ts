import { CartController } from "./controller/CartController";
import { CartModel } from "./model/CartModel";
import { CartView } from "./view/CartView";

const cart = new CartController(new CartView(), new CartModel());