export class IndexModel {

    public URI = 'http://localhost:1802/';
    public products: any;
    public pages: number;
    public currentPage: number;
    public maxPrice: number;

    constructor() {
        this.pages = 0;
        this.currentPage = 0;
        this.maxPrice = 0;
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

    getMax(products: any) {
        let productsCopy = products.slice();
        const resultadosOrdenados = productsCopy.sort((a: any, b: any) => {
            return Number.parseInt(b.price) - Number.parseInt(a.price)
        })
        this.maxPrice = Math.ceil(resultadosOrdenados[0].price);
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
                    this.products = data;
                }
            })
            .then(() => this.pages = Math.ceil(this.products.length / 12))
            .then(() => this.currentPage = 1)
            .catch(err => console.log(err));
    }

    filterPriceProducts = async (min: number, max: number) => {
        await fetch(`${this.URI}api/filter`, {
            method: 'POST',
            body: JSON.stringify({ min: min, max: max }),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data != NaN && data != null) {
                    this.products = data;
                }
            })
            .then(() => this.pages = Math.ceil(this.products.length / 12))
            .then(() => this.currentPage = 1)
            .catch(err => console.log(err));
    }

    addToFavorites = async (id: number) => {
        await fetch(`${this.URI}api/addFavorites`, {
            method: 'POST',
            body: JSON.stringify({ id: id, email: 'prueba@gmail.com' }),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.message)
                }else{
                    console.log('Registro exitoso');
                }
            })
    }
}