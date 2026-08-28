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

    validate(obj) {
        const errors = [];

        for (const field in this.definition) {
            const rules = this.definition[field];
            const value = obj[field];

            if (rules.required === true) {
                if (value === undefined || value === "") {
                    errors.push(`${field} is required`);
                    continue;
                }
            }

            if (value === undefined) {
                continue;
            }

            if (rules.type === String) {
                if (typeof value !== "string") {
                    errors.push(`${field} must be a string`);
                }
            }

            if (rules.minLength !== undefined) {
                if (value.length < rules.minLength) {
                    errors.push(
                        `${field} should have more than ${rules.minLength} characters`,
                    );
                }
            }

            if (rules.maxLength !== undefined) {
                if (value.length > rules.maxLength) {
                    errors.push(
                        `${field} cannot exceed ${rules.maxLength} characters`,
                    );
                }
            }

            if (rules.enum !== undefined) {
                if (!rules.enum.includes(value)) {
                    errors.push(
                        `${field} must be one of ${rules.enum.join(", ")}`,
                    );
                }
            }
        }

        if (errors.length > 0) {
            throw new Error(errors.join(", "));
        }
    }
}
