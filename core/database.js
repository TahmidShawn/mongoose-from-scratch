import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "./data.json");

const db = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

export function registerCollection(name) {
    if (!db[name]) {
        db[name] = [];
    }

    return db[name];
}

export function saveDatabase() {
    fs.writeFileSync(dataPath, JSON.stringify(db, null, 4));
}
