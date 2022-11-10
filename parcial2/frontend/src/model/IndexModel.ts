import { json } from "express";

export class IndexModel {

    public URI = 'http://localhost:1802/';
    public products: any;
    public pages: number;
    public currentPage: number;
    public maxPrice: number;
    public lengthAllProducts: number;
    public favorites: any = [];
    public cart: any = [];

    constructor() {
        this.pages = 0;
        this.currentPage = 0;
        this.maxPrice = 0;
        this.lengthAllProducts = 0;
    }

    saveProducts = async () => {
        await fetch(`${this.URI}api/products`)
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
    }

    isLogged = async (token: any) => {
        let response = await fetch(`${this.URI}api/isLogged`, {
            method: 'POST',
            body: JSON.stringify({ token: token }),
            headers: {
                "Content-type": "application/json"
            }
        });
        return response.json();
    }

    getMax(products: any) {
        let productsCopy = products.slice();
        const resultadosOrdenados = productsCopy.sort((a: any, b: any) => {
            return Number.parseInt(b.price) - Number.parseInt(a.price)
        })
        this.maxPrice = Math.ceil(resultadosOrdenados[0].price);
    }

    searchProducts = async (query: string) => {
        await fetch(`${this.URI}api/search`, {
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
    }

    filterPriceProducts = async (min: number, max: number) => {
        await fetch(`${this.URI}api/filter`, {
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
    }

    addToFavorites = async (id: number, token: string) => {
        let response = await fetch(`${this.URI}api/searchFavorites`, {
            method: 'POST',
            body: JSON.stringify({ id: id, token: token }),
            headers: {
                "Content-type": "application/json"
            }
        });
        let res = await response.json();
        return res;
    }

    addToCart = async (id: number, token: string) => {
        let response = await fetch(`${this.URI}api/addToCart`, {
            method: 'POST',
            body: JSON.stringify({ id: id, token: token }),
            headers: {
                "Content-type": "application/json"
            }
        });
        let res = await response.json();
        return res;
    }

    getCartId = async (token: any) => {
        let response = await fetch(`${this.URI}api/getCartId`, {
            method: 'POST',
            body: JSON.stringify({ token: token }),
            headers: {
                "Content-type": "application/json"
            }
        });
        let res = response.json();
        return res;
    }

    getFavoritesId = async (token: any) => {
        let response = await fetch(`${this.URI}api/showFavorites`, {
            method: 'POST',
            body: JSON.stringify({ token: token }),
            headers: {
                "Content-type": "application/json"
            }
        });
        let res = response.json();
        return res;
    }

    showFavorites = async (ids: any) => {
        await fetch(`${this.URI}api/getProductsById`, {
            method: 'POST',
            body: JSON.stringify({ ids: ids }),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data != NaN && data != null){
                    this.products = data;
                }
            })
            .then(() => this.pages = Math.ceil(this.products.length / 12))
            .then(() => this.currentPage = 1)
            .catch(err => console.log(err));
    }



    // ME Falta arreglar esto. cambiar la dirección del fetch
    showCart = async (ids: any) => {
        let response = await fetch(`${this.URI}api/getProductsById`, {
            method: 'POST',
            body: JSON.stringify({ ids: ids }),
            headers: {
                "Content-type": "application/json"
            }
        });
        let res = response.json();
        return res;
    }

    makeOrder = async (token: string, totalPrice: number) => {
        let response = await fetch(`${this.URI}api/makeOrder`, {
            method: 'POST',
            body: JSON.stringify({ token: token, cart: this.cart, totalPrice: totalPrice }),
            headers: {
                "Content-type": "application/json"
            }
        });
        let res = await response.json();
        return res;
    }

    deleteProductCart = async (id: number, token: string) => {
        let response = await fetch(`${this.URI}api/deleteProductCart`, {
            method: 'POST',
            body: JSON.stringify({ id: id, token: token }),
            headers: {
                "Content-type": "application/json"
            }
        });
        let res = await response.json();
        return res;
    }
}