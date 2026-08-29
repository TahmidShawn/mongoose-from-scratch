import { registerCollection, saveDatabase } from "./database.js";
import { Document } from "./document.js";
import { Schema } from "./schema.js";

export class Mongoose {
    constructor() {
        this.models = {};
    }

    model(name, schema) {
        // check if model already exists
        if (this.models[name]) {
            return this.models[name];
        }

        // create a model class dynamically
        class Model extends Document {
            constructor(data = {}) {
                super();

                this._doc = schema.applyDefaults(data);
                schema.validate(this._doc);
            }
        }

        Model.schema = schema;
        Model.modelName = name;
        Model.data = registerCollection(name);

        // adding setter and getter method
        for (const field in schema.definition) {
            Object.defineProperty(Model.prototype, field, {
                get() {
                    return this._doc[field];
                },

                set(value) {
                    this._doc[field] = value;
                },
            });
        }

        // static methods

        Model.create = async function (obj) {
            const withDefaults = schema.applyDefaults(obj);

            schema.validate(withDefaults);

            const item = {
                _id: Date.now().toString(),
                ...withDefaults,
            };

            Model.data.push(item);

            saveDatabase();

            return new Model(item);
        };

        Model.find = async function () {
            return Model.data.map((item) => {
                return new Model(item);
            });
        };

        Model.findById = async function (id) {
            const item = Model.data.find((item) => {
                return item._id === id;
            });

            return item ? new Model(item) : null;
        };

        Model.findByIdAndUpdate = async function (id, updates) {
            const item = Model.data.find((item) => {
                return item._id === id;
            });

            if (!item) {
                return null;
            }

            const updatedData = {
                ...item,
                ...updates,
            };

            schema.validate(updatedData);

            Object.assign(item, updatedData);

            saveDatabase();

            return new Model(item);
        };

        Model.findByIdAndDelete = async function (id) {
            const index = Model.data.findIndex((item) => {
                return item._id === id;
            });

            if (index === -1) {
                return null;
            }

            const deletedItem = Model.data[index];

            Model.data.splice(index, 1);

            saveDatabase();

            return new Model(deletedItem);
        };

        // add schema instance methods to the model prototype

        if (schema.methods) {
            for (const name in schema.methods) {
                Model.prototype[name] = schema.methods[name];
            }
        }

        // add schema static methods to the model class

        if (schema.statics) {
            for (const name in schema.statics) {
                Model[name] = schema.statics[name];
            }
        }

        this.models[name] = Model;

        return Model;
    }
}

Mongoose.prototype.Schema = Schema;

const mongoose = new Mongoose();

export default mongoose;
