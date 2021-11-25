const express = require("express");
const router = express.Router();
// const { requireNotLoggedIn } = require("../middleware/auth");
const { hash, compare } = require("../bc");
const db = require("../db/db");

module.exports.authRouter = router;

// --------------- REGISTER ROUTE ---------------
router.post("/registration.json", (req, res) => {
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

// --------------- LOGIN ROUTE ------------------

router.post("/login.json", (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    let userId;

    db.getStoredPassword(email)
        .then((resp) => {
            console.log(resp);
            if (resp.rows[0] == []) {
                resp.success = false;
                return res.json(resp);
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
                        console.log("Exception in /login route: ", err);
                        res.sendStatus(500);
                    });
            } else {
                resp.success = false;
                res.json(resp);
            }
        });
});
