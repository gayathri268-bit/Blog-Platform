const Blog = require("../models/blog");
const createBlog = async (req, res) => {
    try {
        const {
            title,
            category,
            description,
            content,
            tags,
            status,
        } = req.body;

        console.log(req.file);
        console.log(req.file?.originalname);
        
        const blog = await Blog.create({
            title,
            category,
            image: req.file 
            ? `/uploads/${req.file.filename}` : "",
            description,
            content,
            tags: tags ? tags.split(",").map(tag =>
                tag.trim()) : [],
            status,
            author: req.user.id,
        });

        res.status(201).json({
            message: "Blog created successfully",
            blog,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getBlogs = async (req, res) => {
    try {
        const blogs = await
            Blog.find({ status: "published" }).populate("author", "name email");

        res.status(200).json({
            message: "Blogs fetched successfully",
            blogs,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message,
        });
    }
};

const getDraftBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({
            author: req.user.id,
            status: "draft",
        });

        res.status(200).json({
            blogs,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getBlogById = async (req, res) => {
    console.log(req.params.id);
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id, { $inc: { views: 1 } },
            { new: true }
        ).populate("author", "name email");

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found",
            });
        }

        res.status(200).json({
            blog,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateBlog = async (req, res) => {
    try {
        console.log("req.file:", req.file);
        console.log("req.body:", req.body);

        const {
            title,
            category,
            image,
            description,
            content,
            tags,
            status,
        } = req.body;

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found",
            });
        }

        blog.title = title;
        blog.category = category;

        if(req.file){
        blog.image = `/uploads/${req.file.filename}`;
    }
        blog.description = description;
        blog.content = content;
        blog.tags = tags;
        blog.status = status;

        const updatedBlog = await blog.save();

        res.status(200).json({
            message: "Blog updated successfully",
            blog: updatedBlog,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found",
            });
        }

        await Blog.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Blog deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });//
    }
};

const getAnalytics = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user.id });

        const totalBlogs = blogs.length;

        const totalViews = blogs.reduce(
            (sum, blog) => sum + (blog.views || 0),
            0
        );

        const totalLikes = blogs.reduce(
            (sum, blog) => sum + (blog.likes || 0),
            0
        );

        res.status(200).json({
            totalBlogs,
            totalViews,
            totalLikes,
            blogs,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found",
            });
        }

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createBlog,
    getBlogs,
    getDraftBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    getAnalytics,
    likeBlog,
};