const express = require("express");
const { registerUser } = require("../controllers/authController");
const { validateRegistration } =
  require("../middleware/authMiddleware").default;

const router = express.Router();

// Register user route
router.post("/register", validateRegistration, registerUser);

module.exports = router;
