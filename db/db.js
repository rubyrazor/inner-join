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
                WHERE id = $2`;
    
    const params = [url, userId];
    return db.query(q, params);
};