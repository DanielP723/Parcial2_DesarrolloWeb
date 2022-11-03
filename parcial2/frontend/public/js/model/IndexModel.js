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
        this.URI = 'http://localhost:1802/';
        this.saveProducts = () => __awaiter(this, void 0, void 0, function* () {
            yield fetch(`${this.URI}api/products`)
                .then(res => res.json())
                .then(data => {
                if (data != NaN && data != null) {
                    this.products = data;
                }
            })
                .then(() => this.pages = Math.ceil(this.products.length / 12))
                .then(() => this.currentPage = 1)
                .then(() => this.getMax(this.products))
                .catch(err => console.log(err));
        });
        this.searchProducts = (query) => __awaiter(this, void 0, void 0, function* () {
            yield fetch(`${this.URI}api/search`, {
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
                .then(() => this.getMax(this.products))
                .catch(err => console.log(err));
        });
        this.pages = 0;
        this.currentPage = 0;
        this.maxPrice = 0;
    }
    getMax(products) {
        let productsCopy = products.slice();
        const resultadosOrdenados = productsCopy.sort((a, b) => {
            return Number.parseInt(b.price) - Number.parseInt(a.price);
        });
        this.maxPrice = Math.ceil(resultadosOrdenados[0].price);
    }
}
