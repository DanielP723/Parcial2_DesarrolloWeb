var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class IndexModel {
    constructor() {
        this.URI = 'http://localhost:1802/api/';
        this.favorites = [];
        this.cart = [];
        this.saveProducts = () => __awaiter(this, void 0, void 0, function* () {
            yield fetch(`${this.URI}mongo/products`)
                .then(res => res.json())
                .then(data => {
                if (data != NaN && data != null) {
                    this.products = data;
                }
            })
                .then(() => this.pages = Math.ceil(this.products.length / 12))
                .then(() => this.currentPage = 1)
                .then(() => this.lengthAllProducts = this.products.length)
                .then(() => this.getMax(this.products))
                .catch(err => console.log(err));
        });
        this.isLogged = (token) => __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(`${this.URI}mysql/isLogged`, {
                method: 'POST',
                body: JSON.stringify({ token: token }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            return response.json();
        });
        this.searchProducts = (query) => __awaiter(this, void 0, void 0, function* () {
            yield fetch(`${this.URI}mongo/search`, {
                method: 'POST',
                body: JSON.stringify({ query: query }),
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                if (data != NaN && data != null) {
                    this.products = data;
                }
            })
                .then(() => this.pages = Math.ceil(this.products.length / 12))
                .then(() => this.currentPage = 1)
                .catch(err => console.log(err));
        });
        this.filterPriceProducts = (min, max) => __awaiter(this, void 0, void 0, function* () {
            yield fetch(`${this.URI}mongo/filter`, {
                method: 'POST',
                body: JSON.stringify({ min: min, max: max }),
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                if (data != NaN && data != null) {
                    this.products = data;
                }
            })
                .then(() => this.pages = Math.ceil(this.products.length / 12))
                .then(() => this.currentPage = 1)
                .catch(err => console.log(err));
        });
        this.addToFavorites = (id, token) => __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(`${this.URI}mysql/searchFavorites`, {
                method: 'POST',
                body: JSON.stringify({ id: id, token: token }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            let res = yield response.json();
            return res;
        });
        this.addToCart = (id, token) => __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(`${this.URI}mysql/addToCart`, {
                method: 'POST',
                body: JSON.stringify({ id: id, token: token }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            let res = yield response.json();
            return res;
        });
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
        this.getFavoritesId = (token) => __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(`${this.URI}mysql/showFavorites`, {
                method: 'POST',
                body: JSON.stringify({ token: token }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            let res = response.json();
            return res;
        });
        this.showFavorites = (ids) => __awaiter(this, void 0, void 0, function* () {
            console.log(ids);
            yield fetch(`${this.URI}mongo/getProductsById`, {
                method: 'POST',
                body: JSON.stringify({ ids: ids }),
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                if (data != NaN && data != null) {
                    this.products = data;
                }
            })
                .then(() => this.pages = Math.ceil(this.products.length / 12))
                .then(() => this.currentPage = 1)
                .catch(err => console.log(err));
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
        this.getProduct = (id) => __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(`${this.URI}mongo/getProductById`, {
                method: 'POST',
                body: JSON.stringify({ id: id }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            let res = yield response.json();
            return res;
        });
        this.pages = 0;
        this.currentPage = 0;
        this.maxPrice = 0;
        this.lengthAllProducts = 0;
    }
    getMax(products) {
        let productsCopy = products.slice();
        const resultadosOrdenados = productsCopy.sort((a, b) => {
            return Number.parseInt(b.price) - Number.parseInt(a.price);
        });
        this.maxPrice = Math.ceil(resultadosOrdenados[0].price);
    }
}
