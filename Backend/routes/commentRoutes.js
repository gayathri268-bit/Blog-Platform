const express = require("express");
const router = express.Router();

const {
  addComment,
  getComments,
  editComment,
  deleteComment,
} = require("../controllers/commentController");

const protect = require("../middleware/authMiddleware");


router.get("/:blogId", getComments);

router.post("/:blogId", protect, addComment);

router.put("/:id", protect, editComment);

router.delete("/:id", protect, deleteComment);


module.exports = router;