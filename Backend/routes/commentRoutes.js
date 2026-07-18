const express = require("express");
const router = express.Router();

const {
  addComment,
  getComments,
  editComment,
  deleteComment,
  toggleSpam,
} = require("../controllers/commentController");

const protect = require("../middleware/authMiddleware");


router.get("/:blogId", getComments);

router.post("/:blogId", protect, addComment);

router.put("/:id", protect, editComment);

router.put("/:id/spam", protect, toggleSpam);

router.delete("/:id", protect, deleteComment);


module.exports = router;