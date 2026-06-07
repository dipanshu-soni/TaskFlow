const User = require('../models/User');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try
    {
        const {name, email, password, age} = req.body;

        if(!name || !email || !password || !age)
        {
            return res.status(400).json({
                message: "All fields are required !"
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser)
        {
            return res.status(400).json({
                message: "User with this email already exists !"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            age
        });

        await newUser.save();
        res.status(201).json({
            message: "Registration successful and Data Saved !"
        });
    }
    catch(error)
    {
        res.status(500).json({
            message: "Error in saving data !",
            error: error.message
        });
        
        console.log(error);
    }
};

module.exports = registerUser;