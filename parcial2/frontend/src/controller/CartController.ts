import { CartModel } from "src/model/CartModel.js";
import { CartView } from "src/view/CartView.js";

export class CartController{
    private model: CartModel;
    private view: CartView;

    constructor(view: CartView, model: CartModel){
        this.view = view;
        this.model = model;
        this.config();
    }

    config = async () => {
        await this.showCart();
        this.view.showCart(this.model.cart);
        this.view.showSlider();
        this.addMethodsBtnsCart();
        this.addMethodsDeleteProducts();
    }

    showCart = async () => {
        let email = localStorage.getItem('token');
        if (email && email.length > 0) {
            let rows: any;
            await this.model.getCartId(email).then(datos => rows = datos);
            if (rows.error == true) {
                if (rows.message == 'e104') {
                    return this.model.cart = [];
                }
            }
            if (rows) {
                if (rows.length == 0) {
                    return this.model.cart = [];
                    
                }
                let rows2: any = await this.model.showCart(rows);
                if (rows2) {
                    if (rows2.length > 0) {
                        this.model.cart = [];
                        for (let i = 0; i < rows.length; i++) {
                            for (let j = 0; j < rows2.length; j++) {
                                if (rows[i].id_product == rows2[j].ID) {
                                    this.model.cart.push({ ID: rows2[j].ID, amount: rows[i].amount, brand: rows2[j].brand, description: rows2[j].description, discount: rows2[j].discount, image: rows2[j].image, name: rows2[j].name, price: rows2[j].price });
                                    break;
                                }
                            }
                        }
                    } else {
                        return this.model.cart = [];
                    }
                }
            }
        }
    }

    
    addMethodsBtnsCart() {
        this.view.btnBuy.addEventListener('click', async () => {
            let token = localStorage.getItem('token');
            if (token && token.length > 0) {
                if (this.model.cart.length == 0) {
                    return alert('No tienes productos en tu carrito');
                }
                let totalPrice: any;
                totalPrice = this.view.totalPrice;
                if (!totalPrice || totalPrice == 0) {
                    return alert('No tienes productos en tu carrito');
                }
                let response = await this.model.makeOrder(token, totalPrice);
                console.log(response);
                if (response) {
                    if (response.error == true) {
                        alert('Error realizando la compra');
                    }
                    if (response.insertId != 0) {
                        alert('Realizó exitosamente la compra');
                    }
                    return this.showCart();
                }
            } else {
                alert('Debes iniciar sesión para poder realizar un pedido');
            }
        });

        this.view.btnMoreProducts.addEventListener('click', () => {
            return window.open('./index.html', '_self');
        })
    }

    addMethodsDeleteProducts(){
        for (let i = 0; i < this.view.ids.length; i++) {
            let id = this.view.ids[i];
            let temp = this.view.getElement('eliminarProducto'+this.view.ids[i]);
            if(temp){
                temp.addEventListener('click', async () => {
                    let email = localStorage.getItem('token');
                    if (email && email.length != 0) {
                        let response = await this.model.deleteProductCart(id, email);
                        if (response) {
                            if (response.error == false) {
                                return this.config();
                            } else {
                                return alert('Error. No se pudo eliminar el producto del carrito');
                            }
                        }
                        return alert('Error. No se pudo eliminar el producto del carrito');
                    }
                })
            }
        }
    }
}