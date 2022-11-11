import { CartController } from "./controller/CartController.js";
import { CartModel } from "./model/CartModel.js";
import { CartView } from "./view/CartView.js";

const cart = new CartController(new CartView(), new CartModel());