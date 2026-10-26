
import express from "express";
import {
    getProducts,
    createProduct
} from "../controller/ProductController.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);

export default router;
