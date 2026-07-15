const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
    createBlog,
    getBlogs,
    getDraftBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    getAnalytics,
    likeBlog,
} = require("../controllers/blogController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, upload.single("image"), createBlog);
router.get("/", getBlogs);
router.get("/drafts", protect, getDraftBlogs);
router.get("/analytics", protect, getAnalytics);
router.get("/:id", getBlogById);

router.put("/:id/like", likeBlog);

router.put("/:id", protect, upload.single("image"),updateBlog);
router.delete("/:id", protect, deleteBlog);


module.exports = router;