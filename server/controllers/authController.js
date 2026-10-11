import authModel from "../models/authModel.js";

export const registerUser = async (req, res) => {
    const { name, number, password } = req.body;
    try{
        const existingUser = await authModel.findOne({ number });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = await authModel.create({ name, number, password });
        res.status(201).json({ message: "User registered successfully", user: newUser });

    }catch(err){
        res.status(500).json({message:err.message})
    }
}