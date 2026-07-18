const Comment = require("../models/Comment");
const Blog = require("../models/blog");
const isSpamText = require("../utils/spamFilter");

const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const comment = await Comment.create({
      blog: req.params.blogId,
      user: req.user.id,
      text,
      isSpam: isSpamText(text),
    });

    res.status(201).json({
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Comment deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      blog: req.params.blogId,
    }).populate("user", "name");

    res.status(200).json({
      comments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const editComment = async (req, res) => {
  try {
    const { text } = req.body;

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    comment.text = text;

    await comment.save();

    res.status(200).json({
      message: "Comment updated successfully",
      comment,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const toggleSpam = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate("blog");

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.blog.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to moderate this comment",
      });
    }

    comment.isSpam = !comment.isSpam;

    await comment.save();

    res.status(200).json({
      message: "Comment moderation status updated",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addComment,
  getComments,
  editComment,
  deleteComment,
  toggleSpam,
};