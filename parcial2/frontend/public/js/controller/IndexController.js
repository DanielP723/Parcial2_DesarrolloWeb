var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class IndexController {
    constructor(view, model) {
        this.config = () => __awaiter(this, void 0, void 0, function* () {
            yield this.model.saveProducts();
            this.view.showProducts(this.model.products, 1);
            this.view.pagination(this.model.pages, this.model.currentPage);
            this.addMethodsPaginationBar(this.view.paginationBar);
            this.addMethodSearch();
        });
        this.view = view;
        this.model = model;
        this.config();
    }
    addMethodSearch() {
        this.view.searchElements[0].addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            let query = String(this.view.searchElements[1].value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
            if (query.length != 0) {
                yield this.model.searchProducts(query);
                this.view.showProducts(this.model.productsSearch, this.model.currentPageSearch);
                this.view.pagination(this.model.pagesSearch, this.model.currentPageSearch);
            }
            else {
                yield this.model.saveProducts();
                this.view.showProducts(this.model.products, 1);
                this.view.pagination(this.model.pages, this.model.currentPage);
                this.model.restartSearch();
            }
        }));
    }
    addMethodsPaginationBar(paginationBar) {
        for (let i = 0; i < paginationBar.length; i++) {
            paginationBar[i].addEventListener('click', () => this.changePage(i));
        }
    }
    changePage(i) {
        if (i >= 0 && i <= 6) {
            let page = this.view.paginationBar[i].textContent;
            if (i < 5) {
                if (page != this.model.currentPage) {
                    this.model.currentPage = page;
                    this.view.showProducts(this.model.products, page);
                    this.view.pagination(this.model.pages, this.model.currentPage);
                }
            }
            else if (i == 6) {
                if (this.model.currentPage + 1 <= this.model.pages) {
                    this.model.currentPage++;
                    this.view.showProducts(this.model.products, this.model.currentPage);
                    this.view.pagination(this.model.pages, this.model.currentPage);
                }
            }
            else {
                if (this.model.currentPage - 1 > 0) {
                    this.model.currentPage--;
                    this.view.showProducts(this.model.products, this.model.currentPage);
                    this.view.pagination(this.model.pages, this.model.currentPage);
                }
            }
        }
    }
}
