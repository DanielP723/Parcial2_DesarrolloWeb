import MongoDBC from "../DB/mongo/MongoDBC";

class ProductModel{

    private MongoDBC: MongoDBC;

    constructor(){
        this.MongoDBC = new MongoDBC();
    }

    public getProducts = async (fn: Function) => {
        this.MongoDBC.connection();
        const products = await this.MongoDBC.ProductSchema.find();
        fn(products);
    }

    public searchProducts = async (query: string, fn: Function) => {
        this.MongoDBC.connection();
        const products = await this.MongoDBC.ProductSchema.find({name: new RegExp(query, 'i')});
        fn(products);
    }

    public filterPriceProducts = async (min: number, max: number, fn: Function) => {
        this.MongoDBC.connection();
        const products = await this.MongoDBC.ProductSchema.find({price: {$gte: min, $lte: max}});
        fn(products);
    }

    public showFavorites = async (ids: any, fn: Function) => {
        this.MongoDBC.connection();
        let allIds = ids.map((x: { id_product: any; }) => x.id_product);
        const products = await this.MongoDBC.ProductSchema.find({ID: {$in: allIds}});
        fn(products);
    }

    public getProductById = async (id: any, fn: Function) => {
        this.MongoDBC.connection();
        const products = await this.MongoDBC.ProductSchema.find({ID: id});
        fn(products);
    }
}

export default ProductModel;