export class IndexView {
    constructor() {
        this.getElement = (selector) => document.getElementById(selector);
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
        this.hearts = [];
        this.btnFavorites = this.getElement('btnMisFavoritos');
    }
    showProducts(products, favorites, page) {
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
                }
                else {
                    html += "<i class='fa-regular fa-heart' id='corazon" + products[index].ID + "'></i>";
                }
                this.ids.push(products[index].ID);
                html += "<img  src='" + products[index].image + "'alt='product" + String(index + 1) + "'>" +
                    "     </div>" +
                    "    <div class='descripcion'> ";
                if (products[index].name.length > 16) {
                    html += "<h4 id='nombre" + String(products[index].ID) + "'>" + products[index].name.substring(0, 13) + "...</h4>";
                }
                else {
                    html += "<h4 id='nombre" + String(products[index].ID) + "'>" + products[index].name + "</h4>";
                }
                html +=
                    "        <h6 id='cantidad'>" + products[index].discount + "</h6>" +
                        "        <label id='marca'>" + products[index].brand + "</label>" +
                        "        <h4 class='precio mt - 2'>" + String(parseFloat(products[index].price).toFixed(2)) + " $</h4>" +
                        "    </div>" +
                        "        <a id='agregar' class='agregar' onclick='agregarProducto(" + products[index].ID + ")'><i class='fa-solid fa-cart-plus'></i>Agregar al carrito</a>" +
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
    pagination(pages, currentPage) {
        let index = currentPage;
        let cont = pages - currentPage;
        if (cont >= 5) {
            cont = currentPage + 4;
        }
        else {
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
            }
            else {
                this.paginationBar[i - 1].style.visibility = "visible";
            }
            cont--;
        }
        if (pages <= 5) {
            this.paginationBar[5].style.visibility = "hidden";
            this.paginationBar[6].style.visibility = "hidden";
        }
        else {
            this.paginationBarVisible();
            if (currentPage == 1) {
                this.paginationBar[6].style.visibility = "hidden";
            }
            else {
                this.paginationBar[6].style.visibility = "visible";
            }
            if (currentPage == pages) {
                this.paginationBar[5].style.visibility = "hidden";
            }
            else {
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
    setFilterPrice(maxPrice) {
        if (maxPrice > 20) {
            this.filterElements[7] = 5;
        }
        else {
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
