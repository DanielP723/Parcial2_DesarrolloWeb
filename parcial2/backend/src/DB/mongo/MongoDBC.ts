import mongoose, { mongo } from "mongoose";
import ProductSchema from "./schemas/ProductSchema";
import dotenv from "dotenv";

class MongoDBC {

    private uri: string;
    public ProductSchema: any;
    public dbName = 'parcialWEB';
    public colletion = 'productos';
    constructor() {
        dotenv.config();
        this.uri = `mongodb+srv://${process.env.mongoUser}:${process.env.mongoPass}@cluster0.a87koto.mongodb.net/${process.env.mongoDBName}?retryWrites=true&w=majority`;
        this.ProductSchema = ProductSchema;
    }

    public connection(){
        mongoose.connect(this.uri)
            .then(() => {console.log('DB: Mongo connection');})
            .catch((err) => {console.log('Error connecting MongoDB: ', err)})
    }
}

export default MongoDBC;