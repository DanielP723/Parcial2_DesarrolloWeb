export class IndexModel {

    public URI = 'http://localhost:1802/';
    public products: any;
    public pages: number;
    public currentPage: number;
    public productsSearch: any;
    public pagesSearch = 0;
    public currentPageSearch = 0;

    constructor() {
        this.pages = 0;
        this.currentPage = 0;
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
            .then(() => this.getMax(this.products))
            .catch(err => console.log(err));
    }

    getMax(products: any){
        let productsSort = products.sort(products.price);
        console.log(productsSort[productsSort.length-1]);
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
                    this.productsSearch = data;
                }
            })
            .then(() => this.pagesSearch = Math.ceil(this.productsSearch.length / 12))
            .then(() => this.currentPageSearch = 1)
            .catch(err => console.log(err));
    }

    restartSearch() {
        this.productsSearch = [];
        this.pagesSearch = 0;
        this.currentPageSearch = 0;
    }
}