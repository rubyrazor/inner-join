const spicedPg = require("spiced-pg");
const dbUsername = "postgres";
const dbUserPassword = "posgres";
const database = "socialnetwork";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${dbUsername}:${dbUserPassword}@localhost:5432/${database}`
);

module.exports.addUser = (first, last, email, hashedPw) => {
    const q = `INSERT INTO users (first, last, email, hashed_pw)
                VALUES($1, $2, $3, $4)
                RETURNING id`;
    const params = [first, last, email, hashedPw];
    return db.query(q, params);
};

module.exports.getStoredPassword = (email) => {
    const q = `SELECT hashed_pw FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.getUserIdByEmail = (email) => {
    const q = `SELECT id FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.checkEmail = (email) => {
    const q = `SELECT * FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.storeVerCode = (email, verCode) => {
    const q = `INSERT INTO verification (email, ver_code)
                VALUES ($1, $2)`;
    const params = [email, verCode];
    return db.query(q, params);
};

module.exports.verifyVerCode = (email) => {
    const q = `SELECT ver_code FROM verification
                WHERE email = $1
                ORDER BY created_at DESC
                LIMIT 1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.updatePassword = (email, newHashedPass) => {
    const q = `UPDATE users
                SET hashed_pw = $1
                WHERE email = $2`;
    const params = [newHashedPass, email];
    return db.query(q, params);
};

module.exports.updateProfilePic = (userId, url) => {
    const q = `Update users
                SET profile_pic_url = $1
                WHERE id = $2
                RETURNING profile_pic_url`;

    const params = [url, userId];
    return db.query(q, params);
};

module.exports.getUserData = (userId) => {
    const q = `SELECT first, last, profile_pic_url, bio
                FROM users
                WHERE id = $1`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.addBio = (userId, bio) => {
    const q = `Update users
                SET bio = $1
                WHERE id = $2
                RETURNING bio`;
    const params = [bio, userId];
    return db.query(q, params);
};

module.exports.getThreeMostRecentUsers = (userId) => {
    const q = `Select id, first, last, profile_pic_url, bio
                FROM users
                WHERE id != $1
                ORDER BY id DESC
                LIMIT 3`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.getUsersMatchingSearchTerm = (userId, searchTerm) => {
    if (searchTerm.includes(" ")) {
        const first = searchTerm.split("")[0];
        const last = searchTerm.split("")[1];
        const q = `SELECT id, first, last, profile_pic_url, bio FROM users
                    WHERE first ILIKE $1 AND last ILIKE $2`;
        const params = [first + "%", last + "%"];
        return db.query(q, params);
    } else {
        const q = `SELECT id, first, last, profile_pic_url, bio FROM users
                    WHERE first ILIKE $2 AND id != $1 OR last ILIKE $2 AND id != $1`;
        const params = [userId, searchTerm + "%"];
        return db.query(q, params);
    }
};
