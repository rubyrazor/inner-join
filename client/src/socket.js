import { io } from "socket.io-client";

import {
    chatMessagesReceived,
    chatMessageReceived,
} from "./redux/messages/slice.js";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) => {
            console.log("Got here", msgs);
            store.dispatch(chatMessagesReceived(msgs));
        });

        socket.on("chatMessage", (msg) => {
            console.log("socket.js", msg);
            store.dispatch(chatMessageReceived(msg));
        });
    }
};
