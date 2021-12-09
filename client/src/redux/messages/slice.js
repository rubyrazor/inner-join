export function chatReducer(chatMessages = null, action) {
    if (action.type == "messages/chatMessages") {
        console.log("Got here, too!");
        chatMessages = action.payload.chatMessages;
    }
    if (action.type == "messages/chatMessage") {
        const newMessage = action.payload.chatMessage;
        chatMessages = [newMessage, ...chatMessages];
    }
    return chatMessages;
}

export function chatMessagesReceived(chatMessages) {
    console.log("Got here, as well!");
    return {
        type: "messages/chatMessages",
        payload: { chatMessages },
    };
}

export function chatMessageReceived(chatMessage) {
    console.log("Logging chatMessage: ", chatMessage);
    return {
        type: "messages/chatMessage",
        payload: { chatMessage },
    };
}
