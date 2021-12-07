import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";

export default function Chat() {
    const [error, setError] = useState(false);

    const messages = useSelector((state) => state?.chatMessages);

    console.log("Logging messages: ", messages);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("newChatMessage", e.target.value);
        }
    };

    socket.on("error", () => setError(true));

    useEffect(() => {});

    return (
        <>
            <div id="chat">
                {messages &&
                    messages
                        .slice(0)
                        .reverse()
                        .map((message) => {
                            return (
                                <div
                                    className="helper-div16"
                                    key={message.message_id}
                                >
                                    <div>
                                        <img
                                            className="chat-img"
                                            src={`${message.profile_pic_url}`}
                                        />
                                        <div className="chat-name">
                                            {`${message.first} ${message.last}`}
                                        </div>
                                    </div>
                                    <p>{message.message}</p>
                                </div>
                            );
                        })}
            </div>
            <textarea onKeyDown={keyCheck} />
            {error && <div className="error">Oops, something went wrong!</div>}
        </>
    );
}
