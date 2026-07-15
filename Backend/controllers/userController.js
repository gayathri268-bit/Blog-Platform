const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const userExists = await
            User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User alredy exists",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await
            bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User Registered Sucessfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await
            User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        const isMatch = await
            bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password",
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        
        user.name = req.body.name || user.name;
        user.bio = req.body.bio || user.bio;
        
        if(req.file) {
            user.profileImage = `uploads/$
            {req.file.filename}`;
            console.log(user.profileImage);
        }

        user.socialLinks.facebook =
            req.body.facebook || user.socialLinks.facebook;

        user.socialLinks.linkedin =
            req.body.linkedin || user.socialLinks.linkedin;

        user.socialLinks.github =
            req.body.github || user.socialLinks.github;


        const updatedUser = await user.save();
        console.log(user.profileImage);

        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const Blog = require("../models/Blog");

const getAuthorProfile = async (req, res) => {
    try {
        const User = require("../models/User");

        const author = await User.findById(req.params.id).select("-password");

        if (!author) {
            return res.status(404).json({
                message: "Author not found",
            });
        }

        const blogs = await Blog.find({
            author: req.params.id,
            status: "published",
        });

        res.status(200).json({
            author,
            blogs,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const subscribeAuthor = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user.subscriptions.includes(req.params.id)) {
            user.subscriptions.push(req.params.id);
            await user.save();
        }

        res.status(200).json({
            message: "Subscribed successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    getAuthorProfile,
    subscribeAuthor,
};