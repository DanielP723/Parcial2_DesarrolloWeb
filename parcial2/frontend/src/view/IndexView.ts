export class IndexView {

    private container: any;
    public paginationBar: any;
    // List of elements necessary to search. Index 0 is the button, Index 1 the browser
    public searchElements: any;

    constructor() {
        this.container = this.getElement('container');
        this.paginationBar = [this.getElement('pag1'), this.getElement('pag2'),this.getElement('pag3'),
                            this.getElement('pag4'),this.getElement('pag5'), this.getElement('next'),
                        this.getElement('previous')];
        this.searchElements = [this.getElement('btnBuscar'), this.getElement('busqueda')];
    }

    private getElement = (selector: string): HTMLElement | null => document.getElementById(selector);

    showProducts(products: any, page: number) {
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
                    "     <div class='imagen my-3' id='corazon" + products[index].ID + "' >";
                html += "<i class='fa-regular fa-heart'></i>";
                html += "<img  src='" + products[index].image + "'alt='product" + String(index + 1) + "'>" +
                    "     </div>" +
                    "    <div class='descripcion'> ";
                html += "<h4 id='nombre" + String(products[index].ID) + "'>" + products[index].name + "</h4>";
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
            this.paginationBar[i-1].innerHTML = cont;
            this.paginationBar[i-1].style.color = "#0d6efd";
            if (cont <= 0) {
                this.paginationBar[i-1].style.visibility = "hidden";
            } else {
                this.paginationBar[i-1].style.visibility = "visible";
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
        this.paginationBar[index-1].style.color = "green";
    }

    paginationBarVisible(){
        for (let i = 0; i < this.paginationBar.length; i++) {
            this.paginationBar[i].style.visibility = "visible";
        }
    }
}