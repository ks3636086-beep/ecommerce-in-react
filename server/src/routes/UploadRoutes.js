
import express from "express";
import multer from "multer";
import adminAuth from "../middleware/adminAuth.js";
import { uploadCategoryImage } from "../controller/UploadController.js";

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"));
        }
    },
});

router.post(
    "/category-image",
    adminAuth,
    upload.single("image"),
    uploadCategoryImage
);

export default router;
