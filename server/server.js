// Express
const express = require("express");
const app = express();
//
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
// Socket-Io
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

// Initial configuration of cookie session.
const cookieSessionMiddleware = app.use(
    cookieSession({
        secret: COOKIE_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

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

    socket.emit("chatMessages", {
        message: "Welome. It is nice to see you",
    });

    console.log(`socket with the id ${socket.id} is now connected`);

    socket.on("disconnect", function () {
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });

    socket.on("thanks", function (data) {
        console.log(data);
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
