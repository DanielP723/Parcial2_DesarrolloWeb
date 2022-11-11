var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class CartModel {
    constructor() {
        this.URI = 'http://localhost:1802/api/';
        this.cart = [];
        this.getCartId = (token) => __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(`${this.URI}mysql/getCartId`, {
                method: 'POST',
                body: JSON.stringify({ token: token }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            let res = response.json();
            return res;
        });
        this.showCart = (ids) => __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(`${this.URI}mongo/getProductsById`, {
                method: 'POST',
                body: JSON.stringify({ ids: ids }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            let res = response.json();
            return res;
        });
        this.makeOrder = (token, totalPrice) => __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(`${this.URI}mysql/makeOrder`, {
                method: 'POST',
                body: JSON.stringify({ token: token, cart: this.cart, totalPrice: totalPrice }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            let res = yield response.json();
            return res;
        });
        this.deleteProductCart = (id, token) => __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(`${this.URI}mysql/deleteProductCart`, {
                method: 'POST',
                body: JSON.stringify({ id: id, token: token }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            let res = yield response.json();
            return res;
        });
    }
}
