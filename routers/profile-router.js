const express = require("express");
const router = express.Router();
const db = require("../db/db");
const s3 = require("../server/s3");
const path = require("path");

// ---------
//Multer
// ---------
const multer = require("multer");
const uidSafe = require("uid-safe");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "..", "server", "uploads"));
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

module.exports.profileRouter = router;

router.post(
    "/upload/image.json",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        const { userId } = req.session;
        const url = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;

        db.updateProfilePic(userId, url)
            .then((resp) => {
                if (resp.rows < 1) {
                    res.json({
                        error: true,
                    });
                } else {
                    res.json({
                        url: resp.rows[0].profile_pic_url,
                        success: true,
                    });
                }
            })
            .catch((err) => {
                console.log("Exception thrown in updateProfilePic: ", err);
                res.json({
                    error: true,
                });
            });
    }
);

router.post("/edit/bio.json", (req, res) => {
    const { userId } = req.session;
    const { bio } = req.body;
    console.log("I got here:", req.body);
    db.addBio(userId, bio)
        .then((resp) => {
            res.json({ bio: resp.rows[0].bio, success: true });
        })
        .catch((err) => {
            console.log("Exception thrown in POST /upload/bio: ", err);
            res.json({
                error: true,
            });
        });
});

router.get("/profile", (req, res) => {
    const { userId } = req.session;
    db.getUserData(userId)
        .then((resp) => {
            console.log("Logging in getUserData: ", resp.rows);
            res.json({
                first: resp.rows[0].first,
                last: resp.rows[0].last,
                profilePicUrl: resp.rows[0].profile_pic_url,
                bio: resp.rows[0].bio
            });
        })
        .catch((err) => {
            console.log(
                "Exception thrown in getUserData, profile-router: ",
                err
            );
            res.json({
                error: true,
            });
        });
});
