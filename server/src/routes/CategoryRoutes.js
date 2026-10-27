
import express from "express";
import adminAuth from "../middleware/adminAuth.js";

import {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
} from "../controller/CategoryController.js";

const router = express.Router();

router.use(adminAuth);

router.post("/", createCategory);
router.get("/", getCategories);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
