
const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

app.get("/", (req, res) => {
    res.send("E-commerce Backend is running!");
});

app.get("/test-db", async (req, res) => {
    try {
        await client.connect();
        await client.db("ecommerce").command({ ping: 1 });

        res.send("MongoDB connected successfully!");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("MongoDB connection failed!");
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
