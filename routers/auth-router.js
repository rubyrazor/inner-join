const express = require("express");
const router = express.Router();
const { hash, compare } = require("../bc");
const db = require("../db/db");

module.exports.authRouter = router;

router.get("/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

router.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

router.post("/registration.json", (req, res) => {
    let first = req.body.first;
    let last = req.body.last;
    let password = req.body.pass;
    let email = req.body.email;

    hash(password)
        .then((hashedPw) => {
            return db.addUser(first, last, email, hashedPw);
        })
        .then((result) => {
            req.session.userId = result.rows[0].id;
            res.json({
                success: true
            });
        })
        .catch((err) => {
            console.log("Exception thrown in /register route", err);
            res.json({ error: true });
        });
});

router.post("/login.json", (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    let userId;
    
    db.getStoredPassword(email)
        .then((resp) => {
            if (resp.rows.length < 1) {
                res.json({
                    error: true,
                });
            } else {
                let storedPassword = resp.rows[0].hashed_pw;
                return compare(pass, storedPassword);
            }
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
                        console.log("Exception thrown in /login route: ", err);
                    });
            } else {
                res.json({
                    error: true,
                });
            }
        });
});

