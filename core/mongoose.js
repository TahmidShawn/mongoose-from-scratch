import { Schema } from "./schema.js";

export class Mongoose {
    constructor() {
        this.models = {};
    }

    model(name, schema) {}
}

Mongoose.prototype.Schema = Schema;

const mongoose = new Mongoose();

export default mongoose;
