export class CartModel{

    public URI = 'http://localhost:1802/';
    public cart: any = [];

    constructor(){

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