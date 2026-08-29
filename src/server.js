import express from "express";
import mongoose from "../core/mongoose.js";

const app = express();

app.use(express.json());

// ============================================================
// schema
// ============================================================

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 30,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
});

// ============================================================
// model
// ============================================================

const User = mongoose.model("User", userSchema);

// ============================================================
// create user
// ============================================================

app.post("/users", async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "Request body cannot be empty",
            });
        }

        const user = await User.create(req.body);

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});

// ============================================================
// get all users
// ============================================================

app.get("/users", async (req, res) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

// ============================================================
// get user by id
// ============================================================

app.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

// ============================================================
// update user
// ============================================================

app.patch("/users/:id", async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "Request body cannot be empty",
            });
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});

// ============================================================
// delete user
// ============================================================

app.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.json({
            message: "User deleted successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

// ============================================================
// server
// ============================================================

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
