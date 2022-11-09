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

    isLogged = async () => {
        let token = localStorage.getItem('token');
        if(token && token.length > 0){
            let response = await this.model.isLogged(token);
            if(response.error == false){
                await this.model.getFavoritesId(token)
                    .then(datos => {
                        if(datos.error == true){
                            return;
                        }
                        if(datos){
                            if(datos.length == 0){
                                this.model.favorites = [];
                            }else{
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
            if(email && email.length > 0){
                let rows: any;
                await this.model.getFavoritesId(email).then(datos => rows = datos);
                if(rows.error == true){
                    if(rows.message == 'e104'){
                        return alert('Debes iniciar sesión para poder ver tus favoritos');
                    }else{
                        return alert('Error al ver favoritos');
                    }
                }
                if(rows){
                    if(rows.length == 0){
                        this.model.products = [];
                        this.model.pages = 0;
                        this.model.currentPage = 1;
                        return this.showProducts();
                    }
                    await this.model.showFavorites(rows);
                    this.showProducts();
                }
            }else{
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

    addToFavorites = async (id: number) => {
        if (id && id > 0 && id <= this.model.lengthAllProducts) {
            let email = localStorage.getItem('token');
            if (email && email.length != 0) {
                let response: any = await this.model.addToFavorites(id, email);
                if (response) {
                    let temp: any;
                    temp = this.view.getElement('corazon' + id);
                    if(response.error == true){
                        if(response.message == 'e104'){
                            return alert('Debes iniciar sesión para poder agregar a favoritos');
                        }else{
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
            }else{
                return alert('Debes iniciar sesión para poder agregar a favoritos');
            }
        }
    }

    showProducts = async () => {
        await this.isLogged();
        this.view.showProducts(this.model.products, this.model.favorites, this.model.currentPage);
        this.view.pagination(this.model.pages, this.model.currentPage);
        this.addMethodFavorites();
    }

}