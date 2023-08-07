import express from "express";
import cors from "cors";
import fs from "fs";

const PORT = 8090;

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:8080",
}));

const cartItems = [];

function readItems() {
    const content = fs.readFileSync("./items.json", "utf8");
    const json = JSON.parse(content);
    return json;
}

app.get("/items", (req, res) => {
    const items = readItems();
    res.json(items);
});

app.get("/cart/items", (req, res) => {
    res.json(cartItems);
});

app.post("/cart/items", (req, res) => {
    cartItems.push(req.body);
    res.send("Ok");
});

app.listen(PORT, () => {
    console.log(`Server running on:\n  http://localhost:${PORT}`)
});
