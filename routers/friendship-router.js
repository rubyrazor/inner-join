const express = require("express");
const router = express.Router();
const db = require("../db/db.js");

module.exports.friendshipRouter = router;

router.get("/api/relation/:id", (req, res) => {
    const { id } = req.params;
    const { userId } = req.session;

    db.getRelation(id, userId).then((resp) => {
        console.log(resp);
        if (resp.rows.length < 1) {
            res.json({
                status: 0,
            });
        } else if (resp.rows[1].accepted === true) {
            res.json({
                status: 3,
            });
        } else if (resp.rows[1].accepted === false) {
            if (resp.rows[1].sender_id == userId) {
                res.json({
                    status: 1,
                });
            } else if (resp.rows[1].recipient_id == userId) {
                res.json({
                    status: 2,
                });
            }
        }
    });
});

router.post("/api/relation/update/:id", (req, res) => {
    const { id: otherId } = req.params;
    const { userId } = req.session;
    const { message } = req.body;
    console.log(otherId);
    console.log(userId);
    console.log(message);

    db.updateRelation(message, otherId, userId)
        .then(() => {
            res.json({
                success: true,
            });
        })
        .catch((err) => {
            console.log(
                "Exception thrown in /api/relation/update/:id, db.updateRelation",
                err
            ),
                res.json({
                    success: false,
                });
        });
});
