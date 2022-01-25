const express = require("express");
const router = express.Router();
const db = require("../db/db.js");

module.exports.friendshipRouter = router;

router.get("/api/relation/:id", (req, res) => {
    const { id } = req.params;
    const { userId } = req.session;

    db.getRelation(id, userId)
        .then((resp) => {
            if (resp.rows.length < 1) {
                res.json({
                    status: 0,
                });
            } else if (resp.rows[0].accepted === true) {
                res.json({
                    status: 3,
                });
            } else if (resp.rows[0].accepted === false) {
                if (resp.rows[0].sender_id == userId) {
                    res.json({
                        status: 1,
                    });
                } else if (resp.rows[0].recipient_id == userId) {
                    res.json({
                        status: 2,
                    });
                }
            }
        })
        .catch((err) => {
            console.log(
                "Exception thrown in /api/realtion/:id, in friendship-router",
                err
            );
            res.json({
                success: false,
            });
        });
});

router.post("/api/relation/update/:id", (req, res) => {
    const { id: otherId } = req.params;
    const { userId } = req.session;
    const { message } = req.body;

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

router.get("/api/friends", (req, res) => {
    const { userId } = req.session;
    db.getFriendsAndWannabes(userId)
        .then((resp) => {
            res.json(resp.rows);
        })
        .catch((err) => {
            console.log("Exception thrown in /api/friends, friendship-router.js. ", err);
            res.json({
                error: true
            });
        });
});
