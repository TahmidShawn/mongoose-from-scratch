import { saveDatabase } from "./database.js";

export class Document {
    async save() {
        // find model
        const Model = this.constructor;

        if (Model.schema.definition.updatedAt) {
            this._doc.updatedAt = new Date().toISOString();
        }

        Model.schema.validate(this._doc);

        const index = Model.data.findIndex(
            (item) => item._id === this._doc._id,
        );

        if (index === -1) {
            this._doc._id = Date.now().toString();

            Model.data.push(this._doc);
        } else {
            Model.data[index] = this._doc;
        }

        saveDatabase();

        return this;
    }

    async validate() {
        const Model = this.constructor;

        Model.schema.validate(this._doc);

        return true;
    }
toJSON() {
        return this._doc;
    }
}
