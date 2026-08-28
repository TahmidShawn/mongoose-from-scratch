export class Schema {
    constructor(definition, options = {}) {
        this.definition = definition;

        this.methods = {};
        this.statics = {};

        if (options.timestamps === true) {
            this.definition.createdAt = {
                type: String,
                default: () => new Date().toISOString(),
            };

            this.definition.updatedAt = {
                type: String,
                default: () => new Date().toISOString(),
            };
        }
    }
}
