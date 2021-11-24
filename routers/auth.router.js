const express = require("express");
const router = express.Router();
const { requireNotLoggedIn } = require("../middleware/auth");
const { hash, compare } = require("../bc");
const db = require("../db/db");

module.exports.authRouter = router;

// --------------- REGISTER ROUTE ---------------



// --------------- LOGIN ROUTE ------------------


