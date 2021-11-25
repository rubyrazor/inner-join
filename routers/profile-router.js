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
        callback(null, __dirname + "/uploads");
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
    "/upload/:userId",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        console.log("got here!");
        const { userId } = req.params;
        const url = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;

        db.uploadProfilePic(userId, url).then((resp) => {
            console.log(resp);
        });
    }
);
