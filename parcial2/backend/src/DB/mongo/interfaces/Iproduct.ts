import { Document } from "mongoose";

export default interface Iproduct extends Document {
    name: string;
    description: string;
    label: string;
    price: number;
    discount: number;
    image: string;
}