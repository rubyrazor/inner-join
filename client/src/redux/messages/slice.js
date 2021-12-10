export default function chatReducer(chatMessages = null, action) {
    if (action.type == "messages/receivedChatMessages") {
        chatMessages = action.payload.chatMessages;
    }
    if (action.type == "messages/receivedChatMessage") {
        chatMessages = [action.payload.chatMessage, ...chatMessages];
    }
    return chatMessages;
}

export function chatMessagesReceived(chatMessages) {
    return {
        type: "messages/receivedChatMessages",
        payload: { chatMessages },
    };
}

export function chatMessageReceived(chatMessage) {
    return {
        type: "messages/receivedChatMessage",
        payload: { chatMessage },
    };
}


