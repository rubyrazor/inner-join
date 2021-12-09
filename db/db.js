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
                WHERE (email = $1)
                AND (CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes')
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
    const q = `UPDATE users
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
    const q = `UPDATE users
                SET bio = $1
                WHERE id = $2
                RETURNING bio`;
    const params = [bio, userId];
    return db.query(q, params);
};

module.exports.getThreeMostRecentUsers = (userId) => {
    const q = `SELECT id, first, last, profile_pic_url, bio
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

module.exports.getRelation = (otherId, userId) => {
    const q = `SELECT * FROM friendships
                WHERE (sender_id = $1 AND recipient_id = $2)
                OR (recipient_id = $1 AND sender_id = $2)`;
    const params = [otherId, userId];
    return db.query(q, params);
};

module.exports.updateRelation = (message, otherId, userId) => {
    let q;

    if (message === "Make") {
        q = `INSERT INTO friendships (sender_id, recipient_id, accepted)
                VALUES ($1, $2, false)`;
    } else if (message === "Accept") {
        q = `UPDATE friendships
                SET accepted = true
                WHERE (sender_id = $1 AND recipient_id = $2)
                OR (recipient_id = $1 AND sender_id = $2)`;
    } else {
        q = `DELETE FROM friendships
                WHERE (sender_id = $1 AND recipient_id = $2)
                OR (recipient_id = $1 AND sender_id = $2)`;
    }
    const params = [userId, otherId];
    return db.query(q, params);
};

module.exports.getFriendsAndWannabes = (userId) => {
    const q = `
      SELECT users.id, first, last, profile_pic_url, accepted
      FROM friendships
      JOIN users
      ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
      OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
      OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
      `;
    const params = [userId];
    return db.query(q, params);
};

module.exports.getLastTenChatMessages = () => {
    const q = `SELECT first, last, profile_pic_url, messages.user_id AS message_user_id, message, messages.id AS message_id, messages.created_at
                FROM messages
                JOIN users
                ON users.id = messages.user_id
                ORDER BY messages.id DESC
                LIMIT 10`;

    return db.query(q);
};

module.exports.addMessage = (message, userId) => {
    const q = `INSERT INTO messages (user_id, message)
                VALUES ($1, $2)
                RETURNING *`;
    const params = [userId, message];
    return db.query(q, params);
};