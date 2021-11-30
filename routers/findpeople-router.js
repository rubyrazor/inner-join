const express = require("express");
const router = express.Router();
const db = require("../db/db.js");

module.exports.findRouter = router;

router.get("/users/recent.json", (req, res) => {
    const { userId } = req.session;

    db.getThreeMostRecentUsers(userId)
        .then((resp) => {
            console.log("Logging in users/recent: ", resp.rows);
            res.json(resp.rows);
        })
        .catch((err) => {
            console.log(
                "Exception thrown in /user/recent when retrieving data with getThreeMostRecentUsers: ",
                err
            );
            res.json({
                error: true
            });
        });
});

router.get("/users/:searchTerm", (req, res) => {
    const { searchTerm } = req.params;
    const { userId } = req.session;

    db.getUsersMatchingSearchTerm(userId, searchTerm)
        .then((resp) => {
            console.log(resp);
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

// id: resp.rows[0].id,
//         first: resp.rows[0].first,
//         last: resp.rows[0].last,
//         profilePicUrl: resp.rows[0].profile_pic_url
