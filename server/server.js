const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { authRouter } = require("../routers/auth-router.js");
const { resetRouter } = require("../routers/reset-router.js");
const { profileRouter } = require("../routers/profile-router.js");
const { findRouter } = require("../routers/findpeople-router.js");

// ---------
// Cookie-Session
// ---------
const cookieSession = require("cookie-session");
const COOKIE_SECRET =
process.env.COOKIE_SECRET || require("../secrets.json").COOKIE_SECRET;

// ----------
// MIDDLEWARE
// ----------
app.use(compression());

// Defines path with help of .join; works better than ""../client/public" (But only works in node-land = server-side)
app.use(express.static(path.join(__dirname, "..", "client", "public")));

// Parses JSON-format request bodies.
app.use(express.json());

// Initial configuration of cookie session.
app.use(
    cookieSession({
        secret: COOKIE_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

// Parses url-encoded request bodies + makes them available as "req.body".
app.use(
    express.urlencoded({
        extended: false,
    })
);

// Parses JSON-format request bodies.
app.use(express.json());

// ----------
// ROUTERS
// ----------
app.use(authRouter);
app.use(resetRouter);
app.use(profileRouter);
app.use(findRouter);

// ----------
// GET ROUTES
// ----------

app.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

// ----------
// * ROUTE
// ----------

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// ----------
// Server
// ----------

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
