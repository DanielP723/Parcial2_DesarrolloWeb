import { IndexView } from "../view/IndexView.js";
import { IndexModel } from "../model/IndexModel.js";

export class IndexController {

    private view: IndexView;
    private model: IndexModel;

    constructor(view: IndexView, model: IndexModel) {
        this.view = view;
        this.model = model;
        this.config();
    }

    config = async () => {
        await this.model.saveProducts();
        this.view.showProducts(this.model.products, 1);
        this.view.pagination(this.model.pages, this.model.currentPage);
        this.addMethodsPaginationBar(this.view.paginationBar);
        this.addMethodSearch();
    }

    addMethodSearch (){
        this.view.searchElements[0].addEventListener('click', async () => {
            let query = String(this.view.searchElements[1].value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
            if(query.length != 0){
                await this.model.searchProducts(query);
                this.view.showProducts(this.model.products, this.model.currentPage);
                this.view.pagination(this.model.pages, this.model.currentPage)
            }else{
                await this.model.saveProducts();
                this.view.showProducts(this.model.products, 1);
                this.view.pagination(this.model.pages, this.model.currentPage);
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
                    this.view.showProducts(this.model.products, page);
                    this.view.pagination(this.model.pages, this.model.currentPage);
                }
            } else if (i == 6) {
                if (this.model.currentPage + 1 <= this.model.pages) {
                    this.model.currentPage++;
                    this.view.showProducts(this.model.products, this.model.currentPage);
                    this.view.pagination(this.model.pages, this.model.currentPage);
                }
            } else {
                if (this.model.currentPage - 1 > 0) {
                    this.model.currentPage--;
                    this.view.showProducts(this.model.products, this.model.currentPage);
                    this.view.pagination(this.model.pages, this.model.currentPage);
                }
            }
        }
    }
}