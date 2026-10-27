
import cloudinary from "../config/cloudinary.js";

export const uploadCategoryImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Please select an image" });
        }

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "ecommerce/categories",
                    resource_type: "image",
                },
                (error, uploadedImage) => {
                    if (error) reject(error);
                    else resolve(uploadedImage);
                }
            );

            stream.end(req.file.buffer);
        });

        res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl: result.secure_url,
        });
    } catch (error) {
        res.status(500).json({
            message: "Image upload failed",
        });
    }
};
