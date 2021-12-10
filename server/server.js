// Express
const express = require("express");
const app = express();
//
//DB
const db = require("../db/db");

//
const compression = require("compression");
const path = require("path");
//
// Routers
const { authRouter } = require("../routers/auth-router.js");
const { resetRouter } = require("../routers/reset-router.js");
const { profileRouter } = require("../routers/profile-router.js");
const { findRouter } = require("../routers/find-router.js");
const { friendshipRouter } = require("../routers/friendship-router.js");
//
// Cookie-Session
const cookieSession = require("cookie-session");
const COOKIE_SECRET =
    process.env.COOKIE_SECRET || require("../secrets.json").COOKIE_SECRET;
//
// Socket-IO
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

// ----------
// MIDDLEWARE
// ----------
app.use(compression());

// Defines path with help of .join; works better than ""../client/public" (But only works in node-land = server-side)
app.use(express.static(path.join(__dirname, "..", "client", "public")));

// Parses JSON-format request bodies.
app.use(express.json());

//

// Initial configuration of cookie session.
const cookieSessionMiddleware = cookieSession({
    secret: COOKIE_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true,
});

app.use(cookieSessionMiddleware);

// Cookie-session will not automatically run on the session cookie that is present on the request property of the socket objects => need to explicitly run it on it => can expect socket.request.session to be present when a user connects.
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

// Parses url-encoded request bodies + makes them available as "req.body".
app.use(
    express.urlencoded({
        extended: false,
    })
);

// Parses JSON-format request bodies.
app.use(express.json());

// ----------
// ROUTERS
// ----------
app.use(authRouter);
app.use(resetRouter);
app.use(profileRouter);
app.use(findRouter);
app.use(friendshipRouter);

// ----------
//
// ----------

app.get("/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

// ----------
// SOCKET-IO
// ----------

io.on("connection", function (socket) {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    db.getLastTenChatMessages()
        .then(({ rows }) => {
            console.log("TenLastMessages: ", rows);
            socket.emit("chatMessages", rows);
        })
        .catch((err) => {
            console.log(
                "Exception thrown in: server.js -> io.on -> db.getLastTenMessages: ",
                err
            );
            socket.emit("error", {
                error: true,
            });
        });

    socket.on("newChatMessage", (message) => {
        const userId = socket.request.session.userId;
        let message_id;
        let created_at;

        db.addMessage(message, userId)
            .then(({ rows }) => {
                message_id = rows[0].id;
                created_at = rows[0].created_at;
                return db.getUserData(userId);
            })
            .then((resp) => {
                io.emit("chatMessage", {
                    first: resp.rows[0].first,
                    last: resp.rows[0].last,
                    profile_pic_url: resp.rows[0].profile_pic_url,
                    message_user_id: userId,
                    message: message,
                    message_id: message_id,
                    created_at: created_at,
                    Hello: "Hello",
                });
            })
            .catch((err) => {
                console.log(
                    "Exception thrown in: server.js -> io.on -> db.addMessage: ",
                    err
                );
                socket.emit("error", {
                    error: true,
                });
            });
    });
});

// ----------
// * ROUTE
// ----------
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// ----------
// Server
// ----------

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
