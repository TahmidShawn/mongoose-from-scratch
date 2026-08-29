# Custom Mongoose

A simplified Mongoose-like library built to understand how models, schemas, documents, validation, and database operations work internally.

## Currently Supported

### Schema Options

The following schema options are currently supported:

- `type: String`
- `required`
- `default`
- `minLength`
- `maxLength`
- `enum`
- `trim`
- `lowercase`
- `timestamps: true`

### Model Methods

Each model currently supports:

- `create()`
- `find()`
- `findById()`
- `findByIdAndUpdate()`
- `findByIdAndDelete()`

### Document Methods

Each document currently supports:

- `save()`
- `validate()`

### Custom Schema Methods

Supports custom instance methods through `schema.methods`.

### Custom Schema Statics

Supports custom static methods through `schema.statics`.

### Database

Data is currently persisted in a local `data.json` file, with a separate collection created for each model.

## Installation

Clone the repository:

```bash
git clone https://github.com/TahmidShawn/mongoose-from-scratch.git
```

Copy the `core` folder into your project.

Import `mongoose.js` from the copied `core` folder:

```js
import mongoose from "../core/mongoose.js";
```

You are now ready to use the custom Mongoose implementation.
