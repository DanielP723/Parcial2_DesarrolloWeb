export class IndexView {

    private container: any;
    public logo: any;
    public paginationBar: any;
    // List of elements necessary to search. Index 0 is the button, Index 1 the browser
    public searchElements: any;
    // List of elements necessary to filter. 0 → lblMinPrice, 1 → lblMaxPrice, 2 → bntFilter, 3 → RangeMin,
    //  4 → RangeMax, 5 → RangeInput, 6 → Range(View the progress), 7 → PriceGap
    public filterElements: any;
    // List of ids of products on the view
    public ids: any;
    public btnFavorites: any;
    private floatCart: any;
    public idsCart: any;
    // Btn 'Realizar pedido'
    public btnBuy: any;
    public btnGoCart: any;
    public totalPrice: any;
    private account: any;
    public singOut: any;
    public modal: any;
    public modalConst: any = document.querySelector('.modaal');
    public closeModal: any;

    constructor() {
        this.container = this.getElement('container');
        // Pagination Bar Elements
        this.paginationBar = [this.getElement('pag1'), this.getElement('pag2'), this.getElement('pag3'),
        this.getElement('pag4'), this.getElement('pag5'), this.getElement('next'), this.getElement('previous')];
        // Search Elements
        this.searchElements = [this.getElement('btnBuscar'), this.getElement('busqueda')];
        // Filter Price Elements
        this.filterElements = [this.getElement('lblMinPrice'), this.getElement('lblMaxPrice'),
        this.getElement('filtrarPrecio'), this.getElement('range_min'), this.getElement('range_max'),
        document.querySelectorAll(".range-input input"), document.querySelector(".slider .progress"), 5];
        this.logo = this.getElement('imgLogo');
        this.ids = [];
        this.btnFavorites = this.getElement('btnMisFavoritos');
        this.floatCart = this.getElement('carroCompras');
        this.btnBuy = this.getElement('btn2');
        this.btnGoCart = this.getElement('btn');
        this.account = this.getElement('listaCuenta');
        this.modal = this.getElement('allModal');
    }

    public getElement = (selector: string): HTMLElement | null => document.getElementById(selector);

    showProducts(products: any, favorites: any, page: number) {
        this.ids = [];
        if (products.length == 0) {
            this.container.innerHTML = '';
            return;
        }
        let html = '';
        let index = (page - 1) * 12;
        let stop = false;
        for (let i = 0; i < 3; i++) {
            if (stop) {
                break;
            }
            html += "<div class='row py-3'>";
            for (let j = 0; j < 4; j++) {
                html += "<div class='col-3 producto'>" + //onmouseover='nombreCompleto("+productos[index][0]+")' onmouseout='nombreCorto("+productos[index][0]+")
                    "     <div class='imagen my-3'>";
                if (favorites.includes(parseInt(products[index].ID))) {
                    html += "<i class='fa-solid fa-heart' id='corazon" + products[index].ID + "'></i>";
                } else {
                    html += "<i class='fa-regular fa-heart' id='corazon" + products[index].ID + "'></i>";
                }
                this.ids.push(products[index].ID);
                html += "<img  src='" + products[index].image + "'alt='product" + String(index + 1) + "'>" +
                    "     </div>" +
                    "    <div class='descripcion' id='openModal" + products[index].ID + "'> ";
                if (products[index].name.length > 16) {
                    html += "<h4 id='nombre" + String(products[index].ID) + "'>" + products[index].name.substring(0, 13) + "...</h4>"
                } else {
                    html += "<h4 id='nombre" + String(products[index].ID) + "'>" + products[index].name + "</h4>";
                }
                html +=
                    "        <h6 id='cantidad'>" + products[index].discount + "</h6>" +
                    "        <label id='marca'>" + products[index].brand + "</label>" +
                    "        <h4 class='precio mt - 2'>" + String(parseFloat(products[index].price).toFixed(2)) + " $</h4>" +
                    "    </div>" +
                    "        <a id='agregar" + String(products[index].ID) + "' class='agregar'><i class='fa-solid fa-cart-plus'></i>Agregar al carrito</a>" +
                    "</div>";
                index++;
                if (index >= products.length) {
                    stop = true;
                    break;
                }
            }
            html += "</div>";
        }
        this.container.innerHTML = html;
    }

    showFloatCart(cart: any) {
        this.floatCart.innerHTML = "";
        let html = "<div class='productosCarro' id='productosCarro'>";
        let subTotal = 0.0;
        this.idsCart = [];
        for (let i = 0; i < cart.length; i++) {
            html += "<div class='item' id='item'>" +
                "<div class='imagenPCarro'>" +
                "<img src='" + cart[i].image + "' alt='' height='100'>" +
                "</div>" +
                "<div class='informacionPCarro'>" +
                "<h4 class='titulo'>" + cart[i].name + "</h4>" +
                "<label for='cantidadPCarro' id='cant'>Cantidad</label>" +
                "<input type='number' class='cantidadPCarro' value='" + cart[i].amount + "' name='cantidadPCarro' id='cantidadPCarro" + cart[i].ID + "'  min='0' max='100'>" +
                "</div>" +
                "<p class='precioPCarro' id='precioPCarro'>" + cart[i].price + "$</p>" +
                "<i id='quitarCarro" + cart[i].ID + "' class='fa-solid fa-trash quitarProducto'></i>" +
                "</div>";
            this.idsCart.push(cart[i].ID);
            subTotal += (parseInt(cart[i].amount) * parseFloat(cart[i].price));
        }
        html += "</div>" +
            "<div class='subtotalCarro'>" +
            "<p id='texto'>Subtotal</p>" +
            "<p id='precio'>" + subTotal.toFixed(2) + "$</p>" +
            "</div>" +
            "<div class='totalCarro'>" +
            "<p><b>TOTAL </b><span><b>(IVA incluido)</b></span></p>";
        let precioTotal: number = subTotal + parseFloat((19 * subTotal / 100).toFixed(2));
        html += "<p><b id='precioTotal'>" + precioTotal.toFixed(2) + "$</b></p>" +
            "</div>";
        if (subTotal + (19 * subTotal / 100) > 45) {
            html += "<p id='alerta'>Envío gratuito.</p>" +
                "<li class='btnsCarro' id='btn'><a href='#'>Ir al carrito</a></li>" +
                "<li class='btnsCarro' id='btn2'><a href='#' >Realizar pedido</a></li>";
        } else if (precioTotal == 0) {
            html += "<li class='btnsCarro' id='btn'><a href='#'>Ir al carrito</a></li>" +
                "<li class='btnsCarro' id='btn2'><a href='#' >Realizar pedido</a></li>";
        } else {
            html += "<p id='alerta'>Te faltan " + (45 - precioTotal).toFixed(2) + "$ para el envío gratuito.</p>" +
                "<li class='btnsCarro' id='btn'><a href='#'>Ir al carrito</a></li>" +
                "<li class='btnsCarro' id='btn2'><a href='#' >Realizar pedido</a></li>";
        }
        this.floatCart.innerHTML = html;
        this.btnBuy = this.getElement('btn2');
        this.btnGoCart = this.getElement('btn');
        this.totalPrice = this.getElement('precioTotal');
    }

    generateListAccount(bool: boolean) {
        let html = "<li class='borde'><a href=''><i class='fa-solid fa-user' ></i>Mi cuenta</a></li>" +
            "<li class='borde' id='btnMisFavoritos2'><a href='#'><i class='fa-regular fa-heart'></i>Mis" +
            "favoritos</a></li>" +
            "<li class='borde'><a href=''><i class='fa-solid fa-check'></i>Mi carrito</a></li>";
        if (bool) {
            html += "<li class='borde' id='signOut'><a href='#'><i class='fa-solid fa-right-from-bracket'></i>Cerrar Sesion</a></li>";
        } else {
            html += "<li class='borde'><a href='./session/signIn.html'><i class='fa-solid fa-lock'></i>Entrar</a></li>" +
                "<li id='bordeN'><a href='./session/signUp.html'><i class='fa-solid fa-user-plus'></i>Crear" +
                " una cuenta</a></li>";
        }
        this.account.innerHTML = html;
        this.singOut = this.getElement('signOut');
    }

    showModal(product: any, favorites: any) {
        let elementos = "<div class='izquierda_modal'>" +
            "<a href='#' class='cerrar' id='cerrarModal'>x</a>" +
            "<div class='imagenProducto_modal'>" +
            "<img src='" + product.image + "' alt='' height='380'>" +
            "</div>" +
            "</div>" +
            "<div class='derecha_modal'>" +
            "<header id='headerModal'>" +
            "<h2>" + product.name + "</h2>";
        if (favorites.includes(parseInt(product.ID))) {
            elementos += "<i class='fa-solid fa-heart corazonFavoritos'></i>";
        } else {
            elementos += "<i class='fa-regular fa-heart corazonFavoritos'></i>";
        }
        elementos += "</header>" +
            "<div class='informacion_modal'>" +
            "<h4 class='medida_modal'>" + product.brand + "</h4>" +
            "<h2 class='precio_modal'>" + product.price + "$</h2>" +
            "<p class='sale_modal'>Sale a: 0.26$/ud.</p>" +
            "</div>" +
            "<div class='descripcion_modal'>" +
            "<p class='drecripcionProducto_modal'>" + product.description + "</p>" +
            "</div>" +
            "<div class='pie_modal'>" +
            "<input type='number' name='cantidad' id='cantidadAgregar' value='0' min='0' max='100'>" +
            "<a href='#' id='anadirCarro_modal' class='anadirCarro'><i " +
            "class='fa-solid fa-basket-shopping'></i> Añadir a la cesta</a>" +
            "</div>" +
            "</div>";
        this.modal.innerHTML = elementos;
        this.modalConst.classList.add('modal--show');
        this.container.style.background = "#f2f2f2";
    }

    cerrarModal() {
        this.modalConst.classList.remove('modal--show');
        this.container.style.background = "#fff";
    }

    pagination(pages: number, currentPage: number) {
        let index = currentPage;
        let cont = pages - currentPage;
        if (cont >= 5) {
            cont = currentPage + 4;
        } else {
            cont = pages;
        }
        for (let i = 5; i > 0; i--) {
            if (cont == currentPage) {
                index = i;
            }
            this.paginationBar[i - 1].innerHTML = cont;
            this.paginationBar[i - 1].style.color = "#0d6efd";
            if (cont <= 0) {
                this.paginationBar[i - 1].style.visibility = "hidden";
            } else {
                this.paginationBar[i - 1].style.visibility = "visible";
            }
            cont--;
        }
        if (pages <= 5) {
            this.paginationBar[5].style.visibility = "hidden";
            this.paginationBar[6].style.visibility = "hidden";
        } else {
            this.paginationBarVisible();
            if (currentPage == 1) {
                this.paginationBar[6].style.visibility = "hidden";
            } else {
                this.paginationBar[6].style.visibility = "visible";
            }
            if (currentPage == pages) {
                this.paginationBar[5].style.visibility = "hidden";
            } else {
                this.paginationBar[5].style.visibility = "visible";
            }
        }
        this.paginationBar[index - 1].style.color = "green";
    }

    paginationBarVisible() {
        for (let i = 0; i < this.paginationBar.length; i++) {
            this.paginationBar[i].style.visibility = "visible";
        }
    }

    setFilterPrice(maxPrice: number) {
        if (maxPrice > 20) {
            this.filterElements[7] = 5;
        } else {
            this.filterElements[7] = 1;
        }
        this.filterElements[0].innerHTML = 0 + "$";
        this.filterElements[1].innerHTML = String(Math.ceil(maxPrice) - 3) + "$";
        this.filterElements[3].max = Math.ceil(maxPrice);
        this.filterElements[4].max = Math.ceil(maxPrice);
        this.filterElements[4].value = Math.ceil(maxPrice) - 3;
        this.filterElements[3].value = 0;
        this.filterElements[6].style.left = 0 + "%";
        this.filterElements[6].style.right = 100 - (this.filterElements[4].value / this.filterElements[5][1].max) * 100 + "%";
    }
}