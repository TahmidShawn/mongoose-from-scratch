# Custom Mongoose

A simplified Mongoose-like library built to understand how models, schemas, documents, validation, and database operations work internally.

## Installation

Install the package from npm:

```bash
npm install custom-mongoose-tahmid
```

Import the custom Mongoose instance:

```js
import mongoose from "custom-mongoose-tahmid";
```

## Currently Supported

### Schema Options

The following schema options are currently supported:

* `type: String`
* `required`
* `default`
* `minLength`
* `maxLength`
* `enum`
* `trim`
* `lowercase`
* `timestamps: true`

### Model Methods

Each model currently supports:

* `create()`
* `find()`
* `findById()`
* `findByIdAndUpdate()`
* `findByIdAndDelete()`

### Document Methods

Each document currently supports:

* `save()`
* `validate()`

### Custom Schema Methods

Supports custom instance methods through `schema.methods`.

### Custom Schema Statics

Supports custom static methods through `schema.statics`.

### Database

Data is currently persisted to a local `data.json` file within the package, with a separate collection created for each model.
