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
}

export default ProductModel;