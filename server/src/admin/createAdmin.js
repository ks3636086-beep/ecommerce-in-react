
import { config } from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);

        const email = "admin@gmail.com";
        const password = "123456";

        const existingAdmin = await User.findOne({ email });

        if (existingAdmin) {
            existingAdmin.role = "admin";
            await existingAdmin.save();
            console.log("Admin role updated successfully");
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            await User.create({
                name: "Admin",
                email,
                password: hashedPassword,
                role: "admin"
            });

            console.log("Admin account created successfully");
        }
    } catch (error) {
        console.error("Admin creation failed:", error.message);
    } finally {
        await mongoose.disconnect();
    }
};

createAdmin();
