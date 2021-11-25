//TO DOs
// #1 Add 10 minute time limit to SQL query
// ----------------------------------------------------

const express = require("express");
const router = express.Router();
// const { requireNotLoggedIn } = require("../middleware/auth");
const { hash } = require("../bc");
const db = require("../db/db");
// Password reset
const cryptoRandomString = require("crypto-random-string");
// Automatically send password-reset-email
const { sendEmail } = require("../server/ses.js");

module.exports.resetRouter = router;

router.post("/password/reset.json", (req, res) => {
    const randomString = cryptoRandomString({
        length: 6,
    });
    const email = req.body.email;
    const verCode = randomString;
    const subject = "Password reset";
    const body = `Please reset your password using the following verification code: ${verCode}`;

    db.checkEmail(email)
        .then((resp) => {
            if (resp.rows.length < 1) {
                res.json({ success: false });
            } else {
                db.storeVerCode(email, verCode);
                sendEmail(email, subject, body);
                res.json({ success: true });
            }
        })
        .catch((err) => {
            console.log(
                "Exception thrown in /passwords/reset.json in reset-route.js: ",
                err
            );
            res.sendStatus(500);
        });
});

router.post("/password/verification.json", (req, res) => {
    const { email, newPass, verCode } = req.body;
    db.verifyVerCode(email).then((resp) => {
        console.log("verifyVerCode: ", resp);
        if (resp.rows.length < 1) {
            res.json({ success: false });
        } else if (resp.rows[0].ver_code === verCode) {
            hash(newPass)
                .then((hashedPW) => {
                    return db.updatePassword(email, hashedPW);
                })
                .then(() => {
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log(
                        "Exception thrown in router.post, reset-router.js: ",
                        err
                    );
                    res.json({ success: false });
                });
        } else {
            console.log("Ended up in the else");
            res.json({ success: false });
        }
    });
});
