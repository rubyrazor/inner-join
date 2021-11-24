const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
// Database
const db = require("../db/db.js");
// Password
const { hash, compare } = require("../bc");
//Cookie-Session
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

// ----------
// GET ROUTES
// ----------

app.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

// ----------
// POST ROUTES
// ----------

app.post("/registration.json", (req, res) => {
    let first = req.body.first;
    let last = req.body.last;
    let password = req.body.pass;
    let email = req.body.email;

    hash(password)
        .then((hashedPw) => {
            db.addUser(first, last, email, hashedPw).then((result) => {
                req.session.userId = result.rows[0].id;
                res.success = true;
                res.json(res);
            });
        })
        .catch((err) => {
            console.log("Exception in /register route", err);
            res.json({ success: false });
        });
});

app.post("/login.json", (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    let userId;

    db.getStoredPassword(email)
        .then((resp) => {
            let storedPassword = resp.rows[0].hashed_pw;
            return compare(pass, storedPassword);
        })
        .then((resp) => {
            if (resp) {
                db.getUserIdByEmail(email)
                    .then((resp) => {
                        userId = resp.rows[0].id;
                        req.session.userId = userId;
                        resp.success = true;
                        res.json(resp);
                    })
                    .catch((err) => {
                        console.log("Exception in /login route: ", err);
                        res.sendStatus(500);
                    });
            } else {
                resp.success = false;
                res.json(resp);
            }
        });
});

// Star-route must be the last route, so it doesn't intercept other requests to server
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
