const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getAuthorProfile,
  subscribeAuthor,
  subscribeCategory,
  unsubscribeCategory,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware")
const upload = require("../middleware/upload");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, getProfile);
router.put(
  "/profile",
  protect,
  upload.single("profileImage"),
  updateProfile
);

router.get("/author/:id", getAuthorProfile);
router.post("/subscribe/:id", protect, subscribeAuthor);
router.post("/subscribe-category", protect, subscribeCategory);
router.post("/unsubscribe-category", protect, unsubscribeCategory);

module.exports = router;
