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

router.get("/profile", (req, res) => {
    const { userId } = req.session;

    db.getUserData(userId)
        .then((resp) => {
            res.json({
                first: resp.rows[0].first,
                last: resp.rows[0].last,
                profilePicUrl: resp.rows[0].profile_pic_url,
                bio: resp.rows[0].bio
            });
        })
        .catch((err) => {
            console.log(
                "Exception thrown in /profile when calling db.getUserData: ",
                err
            );
            res.json({
                error: true,
            });
        });
});

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
                        success: true,
                        url: resp.rows[0].profile_pic_url,
                    });
                }
            })
            .catch((err) => {
                console.log("Exception thrown in /upload/image.json when calling db.updateProfilePic: ", err);
                res.json({
                    error: true,
                });
            });
    }
);

router.post("/edit/bio.json", (req, res) => {
    const { userId } = req.session;
    const { bio } = req.body;

    db.addBio(userId, bio)
        .then((resp) => {
            res.json({ bio: resp.rows[0].bio, success: true });
        })
        .catch((err) => {
            console.log("Exception thrown in /upload/bio.json when calling db.addBio: ", err);
            res.json({
                error: true,
            });
        });
});

