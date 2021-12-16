import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../socket";

export default function Chat() {
    const [error, setError] = useState(false);
    const messages = useSelector((state) => state?.chatMessages);
    const loggedInUserId = useSelector(
        (state) => state.userData?.loggedInUserId
    );

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("newChatMessage", e.target.value);
            e.target.value = "";
        }
    };

    socket.on("error", () => setError(true));

    useEffect(() => {});

    return (
        <>
            <div className="helper-div2">
                <div className="helper-div26">
                    <div className="helper-div27">
                        {messages &&
                            messages.map((message) => {
                                return (
                                    <div
                                        className={
                                            "helper-div16" +
                                            " " +
                                            (message.message_user_id ==
                                            loggedInUserId
                                                ? "right"
                                                : "left")
                                        }
                                        key={message.message_id}
                                    >
                                        <div className="helper-div28">
                                            <img
                                                className="chat-img"
                                                src={`${message.profile_pic_url}`}
                                            />
                                            <div className="chat-name">
                                                {`${message.first.slice(
                                                    0,
                                                    1
                                                )}. ${message.last}`}
                                            </div>
                                        </div>
                                        <div id="chat-msg">
                                            <div data-cy="message-text">{message.message}</div>
                                            <div className="time-msg">
                                                (
                                                {message.created_at.slice(
                                                    0,
                                                    10
                                                )}{" "}
                                                |{" "}
                                                {message.created_at.slice(
                                                    11,
                                                    16
                                                )}
                                                )
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <textarea id="chat-input-fld" onKeyDown={keyCheck} data-cy="message-input-fld"/>
                </div>
            </div>
            {error && <div className="error">Oops, something went wrong!</div>}
        </>
    );
}
