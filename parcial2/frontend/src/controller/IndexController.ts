import { IndexView } from "../view/IndexView.js";
import { IndexModel } from "../model/IndexModel.js";

export class IndexController {

    private view: IndexView;
    private model: IndexModel;

    constructor(view: IndexView, model: IndexModel) {
        this.view = view;
        this.model = model;
        this.config();
        this.view.logo.addEventListener('click', () => {
            window.location.reload();
        })
    }

    config = async () => {
        await this.model.saveProducts();
        this.showProducts();
        this.view.setFilterPrice(this.model.maxPrice);
        this.addMethodFilterPrice(this.view.filterElements);
        this.addMethodsPaginationBar(this.view.paginationBar);
        this.addMethodSearch();
        this.addMethodShowFavorites();
    }

    addMethodsBtnsCart() {
        this.view.btnBuy.addEventListener('click', async () => {
            let token = localStorage.getItem('token');
            if (token && token.length > 0) {
                if (this.model.cart.length == 0) {
                    return alert('No tienes productos en tu carrito');
                }
                let totalPrice: any;
                totalPrice = this.view.totalPrice.innerHTML;
                totalPrice = parseFloat(totalPrice.substring(0, totalPrice.length - 1));
                if (!totalPrice || totalPrice == 0) {
                    return alert('No tienes productos en tu carrito');
                }
                let response = await this.model.makeOrder(token, totalPrice);
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

        this.view.btnGoCart.addEventListener('click', async () => {
            let token = localStorage.getItem('token');
            if (token && token.length > 0) {
                let response = await this.model.isLogged(token);
                if (response) {
                    if (response.error == false) {
                        return window.open('./cart.html', '_self');
                    }
                    if (response.error == true) {
                        return alert('No has iniciado sesión');
                    }
                    return alert('Error. No se puede abrir el carrito');
                }
                return alert('Error. No se puede abrir el carrito');
            } else {
                return alert('No has iniciado sesión');
            }
        });
    }

    getFavorites = async () => {
        let token = localStorage.getItem('token');
        if (token && token.length > 0) {
            let response = await this.model.isLogged(token);
            if (response.error == false) {
                await this.model.getFavoritesId(token)
                    .then(datos => {
                        if (datos.error == true) {
                            return;
                        }
                        if (datos) {
                            if (datos.length == 0) {
                                this.model.favorites = [];
                            } else {
                                for (let i = 0; i < datos.length; i++) {
                                    this.model.favorites.push(datos[i].id_product);
                                }
                            }
                        }
                    });
            }
        }
    }

    addMethodShowFavorites() {
        this.view.btnFavorites.addEventListener('click', async () => {
            let email = localStorage.getItem('token');
            if (email && email.length > 0) {
                let rows: any;
                await this.model.getFavoritesId(email).then(datos => rows = datos);
                if (rows.error == true) {
                    if (rows.message == 'e104') {
                        return alert('Debes iniciar sesión para poder ver tus favoritos');
                    } else {
                        return alert('Error al ver favoritos');
                    }
                }
                if (rows) {
                    if (rows.length == 0) {
                        this.model.products = [];
                        this.model.pages = 0;
                        this.model.currentPage = 1;
                        return this.showProducts();
                    }
                    await this.model.showFavorites(rows);
                    this.showProducts();
                }
            } else {
                return alert('Debes iniciar sesión para poder ver tus favoritos');
            }
        })
    }

    addMethodFilterPrice(filterElements: any) {
        // Handle changes slider
        filterElements[3].addEventListener('click', () => {
            let minVal = parseInt(filterElements[3].value);
            let maxVal = parseInt(filterElements[4].value);
            if ((maxVal - minVal) < filterElements[7]) {
                minVal = maxVal - filterElements[7];
                filterElements[3].value = minVal;
            }
            filterElements[0].innerHTML = String(minVal) + " $";
            filterElements[1].innerHTML = String(maxVal) + " $";
            filterElements[6].style.left = ((minVal / filterElements[5][0].max) * 100) + "%";
            filterElements[6].style.right = 100 - (maxVal / filterElements[5][1].max) * 100 + "%";
        });
        filterElements[4].addEventListener('click', () => {
            let minVal = parseInt(filterElements[3].value);
            let maxVal = parseInt(filterElements[4].value);
            if ((maxVal - minVal) < filterElements[7]) {
                maxVal = minVal + filterElements[7];
                filterElements[4].value = maxVal;
            }
            filterElements[0].innerHTML = String(minVal) + " $";
            filterElements[1].innerHTML = String(maxVal) + " $";
            filterElements[6].style.left = ((minVal / filterElements[5][0].max) * 100) + "%";
            filterElements[6].style.right = 100 - (maxVal / filterElements[5][1].max) * 100 + "%";
        });

        // Button operation
        filterElements[2].addEventListener('click', async () => {
            let min = filterElements[3].value;
            let max = filterElements[4].value;
            if (min >= 0 && min < this.model.maxPrice && max <= this.model.maxPrice && max > min) {
                await this.model.filterPriceProducts(min, max);
                this.showProducts();
            }
        })
    }

    addMethodSearch() {
        this.view.searchElements[0].addEventListener('click', async () => {
            let query = String(this.view.searchElements[1].value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
            if (query.length != 0) {
                await this.model.searchProducts(query);
                this.showProducts();
            } else {
                await this.model.saveProducts();
                this.showProducts();
            }
        })
    }

    addMethodsPaginationBar(paginationBar: any) {
        for (let i = 0; i < paginationBar.length; i++) {
            paginationBar[i].addEventListener('click', () => this.changePage(i));
        }
    }

    changePage(i: number) {
        if (i >= 0 && i <= 6) {
            let page = this.view.paginationBar[i].textContent;
            if (i < 5) {
                if (page != this.model.currentPage) {
                    this.model.currentPage = page;
                    this.showProducts();
                }
            } else if (i == 6) {
                if (this.model.currentPage + 1 <= this.model.pages) {
                    this.model.currentPage++;
                    this.showProducts();
                }
            } else {
                if (this.model.currentPage - 1 > 0) {
                    this.model.currentPage--;
                    this.showProducts();
                }
            }
        }
    }

    addMethodFavorites() {
        for (let i = 0; i < this.view.ids.length; i++) {
            let temp: any;
            temp = this.view.getElement('corazon' + this.view.ids[i]);
            if (temp) {
                let id = this.view.ids[i];
                temp.addEventListener('click', () => this.addToFavorites(id));
            }
        }
    }

    addMethodAddCart() {
        for (let i = 0; i < this.view.ids.length; i++) {
            let temp: any;
            temp = this.view.getElement('agregar' + this.view.ids[i]);
            if (temp) {
                let id = this.view.ids[i];
                temp.addEventListener('click', () => this.addToCart(id));
            }
        }
    }

    addToCart = async (id: number) => {
        if (id && id > 0 && id <= this.model.lengthAllProducts) {
            let email = localStorage.getItem('token');
            if (email && email.length != 0) {
                let response: any = await this.model.addToCart(id, email);
                if (response.error == true) {
                    if (response.message == 'e104') {
                        return alert('Debes iniciar sesión para poder agregar al carrito');
                    }
                    return alert('Error al agregar al carrito');
                }
                this.showCart();
            } else {
                return alert('Debes iniciar sesión para poder agregar al carrito');
            }
        }
    }

    showCart = async () => {
        let email = localStorage.getItem('token');
        if (email && email.length > 0) {
            let rows: any;
            await this.model.getCartId(email).then(datos => rows = datos);
            if (rows.error == true) {
                if (rows.message == 'e104') {
                    this.model.cart = [];
                    this.view.showFloatCart(this.model.cart);
                    return this.addMethodsBtnsCart();
                }
            }
            if (rows) {
                if (rows.length == 0) {
                    this.model.cart = [];
                    this.view.showFloatCart(this.model.cart);
                    return this.addMethodsBtnsCart();
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
                        this.model.cart = [];
                    }
                }
            }
        }
        this.view.showFloatCart(this.model.cart);
        this.addMethodsBtnsCart();
        this.addMethodsDeleteCart();
    }

    addMethodsDeleteCart() {
        for (let i = 0; i < this.view.idsCart.length; i++) {
            let id = this.view.idsCart[i];
            let temp = this.view.getElement('quitarCarro' + id);
            if (temp) {
                temp.addEventListener('click', async () => {
                    let email = localStorage.getItem('token');
                    if (email && email.length != 0) {
                        let response = await this.model.deleteProductCart(id, email);
                        if (response) {
                            if (response.error == false) {
                                return this.showCart();
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

    addToFavorites = async (id: number) => {
        if (id && id > 0 && id <= this.model.lengthAllProducts) {
            let email = localStorage.getItem('token');
            if (email && email.length != 0) {
                let response: any = await this.model.addToFavorites(id, email);
                if (response) {
                    let temp: any;
                    temp = this.view.getElement('corazon' + id);
                    if (response.error == true) {
                        if (response.message == 'e104') {
                            return alert('Debes iniciar sesión para poder agregar a favoritos');
                        } else {
                            return alert('Error al agregar a favoritos');
                        }
                    }
                    if (response.insertId != 0) {
                        temp.classList.add('fa-solid');
                        temp.classList.remove('fa-regular');
                    } else {
                        temp.classList.remove('fa-solid');
                        temp.classList.add('fa-regular');
                    }
                }
            } else {
                return alert('Debes iniciar sesión para poder agregar a favoritos');
            }
        }
    }

    isLogged = async () => {
        let token = localStorage.getItem('token');
        if (token && token.length > 0) {
            let response = await this.model.isLogged(token);
            if (response.error == false) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    addMethodSignOut() {
        let temp = this.view.singOut;
        if (temp) {
            temp.addEventListener('click', () => {
                localStorage.removeItem('token');
                return window.location.reload();
            })
        }
    }

    addMethodOpenModal() {
        for (let i = 0; i < this.view.ids.length; i++) {
            let id = this.view.ids[i];
            let temp = this.view.getElement('openModal' + id);
            if (temp) {
                temp.addEventListener('click', () => this.openModal(id));
            }
        }
    }

    openModal = async (id: number) => {
        let response = await this.model.getProduct(id);
        if (response) {
            if(response[0].ID){
                this.view.showModal(response[0], this.model.favorites);
                let temp = this.view.getElement('cerrarModal');
                if(temp){
                    temp.addEventListener('click', () => this.view.cerrarModal());
                }
            }
        }
    }

    showProducts = async () => {
        await this.getFavorites();
        await this.showCart();
        this.view.showProducts(this.model.products, this.model.favorites, this.model.currentPage);
        this.view.pagination(this.model.pages, this.model.currentPage);
        this.addMethodFavorites();
        this.addMethodAddCart();
        let bool = await this.isLogged();
        this.view.generateListAccount(bool);
        this.addMethodSignOut();
        this.addMethodOpenModal();
    }

}