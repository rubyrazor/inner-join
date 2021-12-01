const express = require("express");
const router = express.Router();
const db = require("../db/db.js");

module.exports.findRouter = router;

router.get("/users/recent.json", (req, res) => {
    const { userId } = req.session;

    db.getThreeMostRecentUsers(userId)
        .then((resp) => {
            res.json(resp.rows);
        })
        .catch((err) => {
            console.log(
                "Exception thrown in /user/recent when retrieving data with getThreeMostRecentUsers: ",
                err
            );
            res.json({
                error: true,
            });
        });
});

router.get("/users/:searchTerm", (req, res) => {
    const { searchTerm } = req.params;
    const { userId } = req.session;

    db.getUsersMatchingSearchTerm(userId, searchTerm)
        .then((resp) => {
            console.log(resp.rows);
            res.json(resp.rows);
        })
        .catch((err) => {
            console.log(
                "Exception thrown in /users/:searchTerm when retrieving data with getAllUsersMatchingSearchTerm: ",
                err
            );
            res.json({
                error: true,
            });
        });
});

router.get("/api/user/:id", (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;

    if (!Number.parseInt(id)) {
        return res.json({
            error: true,
        });
    }

    db.getUserData(id)
        .then((data) => {
            if (id == userId) {
                res.json({
                    userId: req.session.userId,
                });
            } else if (data.rows.length < 1) {
                res.json({
                    notFound: true,
                });
            } else if (data.rows.length > 0) {
                const user = {
                    first: data.rows[0].first,
                    last: data.rows[0].last,
                    profilePicUrl: data.rows[0].profile_pic_url,
                    bio: data.rows[0].bio, 
                };
                res.json({
                    found: true,
                    user
                });
            }
        })
        .catch((err) => {
            console.log(
                "Exception thrown in /api/user/:id, findpeople-router.js: ",
                err
            );
            res.json({ error: true });
        });
});
