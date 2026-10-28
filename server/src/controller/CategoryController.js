import Category from "../models/categoryModel.js";

// Add Category
export const createCategory = async (req, res) => {
    try {
        const { name, slug, description, image, isActive, productCount } = req.body;

        if (!name?.trim() || !slug?.trim()) {
            return res.status(400).json({
                message: "Category name and slug are required",
            });
        }

        const category = await Category.create({
            name: name.trim(),
            slug: slug.trim().toLowerCase(),
            description,
            image,
            isActive: isActive ?? true,
            productCount: Number(productCount) || 0,
        });

        res.status(201).json({
            message: "Category created successfully",
            category,
        });
    } catch (error) {
        res.status(error.code === 11000 ? 409 : 500).json({
            message:
                error.code === 11000
                    ? "Category name or slug already exists"
                    : error.message,
        });
    }
};

// Get All Categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Category
export const updateCategory = async (req, res) => {
    try {
        const { name, slug, description, image, isActive, productCount } = req.body;

        const updateData = {
            name: name?.trim(),
            slug: slug?.trim().toLowerCase(),
            description,
            image,
            isActive,
        };

        if (productCount !== undefined) {
            updateData.productCount = Number(productCount) || 0;
        }

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({
            message: "Category updated successfully",
            category,
        });
    } catch (error) {
        res.status(error.code === 11000 ? 409 : 500).json({
            message:
                error.code === 11000
                    ? "Category name or slug already exists"
                    : error.message,
        });
    }
};

// Delete Category
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({
            message: "Category deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
