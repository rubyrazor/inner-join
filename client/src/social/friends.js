import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receivedFriendsAndWannabes } from "../redux/friends/slice";

export default function Friends() {
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const friends = useSelector(
        (state) =>
            state.friendsAndWannabes &&
            state.friendsAndWannabes.filter((fw) => fw.accepted)
    );
    const wannabes = useSelector(
        (state) =>
            state.friendsAndWannabes &&
            state.friendsAndWannabes.filter((fw) => !fw.accepted)
    );

    useEffect(() => {
        if (!(friends || wannabes)) {
            fetch("/api/friends")
                .then((res) => res.json())
                .then((resp) => {
                    dispatch(receivedFriendsAndWannabes(resp));
                });
        }
    }, []);

    const handleChange = (val, id) => {
        fetch(`/api/relation/update/${id}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                message: `${val}`,
            }),
        })
            .then((res) => res.json())
            .then(({ success }) => {
                if (success != true) {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log(
                    "Exception thrown in handleChange, friend-btn.js: ",
                    err
                );
                setError(true);
            });
    };

    return (
        <div className="helper-div20">
            <div className="helper-div22" data-cy="friendships">
                <div className="title">Friendships</div>
                <div className="wrapper">
                    <div className="helper-div21">
                        {friends &&
                            friends.map((friend) => {
                                return (
                                    <>
                                        <div
                                            className="helper-div23"
                                            key={friend.id}
                                        >
                                            <div className="helper-div24">
                                                <img
                                                    className="other-profile-pic"
                                                    src={`${friend.profile_pic_url}`}
                                                />
                                                <div className="helper-div25">
                                                    {friend.first} {friend.last}
                                                </div>
                                            </div>
                                            <button
                                                className="submit-btn"
                                                onClick={() =>
                                                    handleChange(
                                                        "Unfriend",
                                                        friend.id
                                                    )
                                                }
                                            >
                                                Unfriend
                                            </button>
                                        </div>
                                    </>
                                );
                            })}
                    </div>
                </div>
            </div>
            <div className="helper-div22" data-cy="friendship-requests">
                <div className="title">Friendship Requests</div>
                <div className="wrapper">
                    <div className="helper-div21">
                        {wannabes &&
                            wannabes.map((wannabe) => {
                                return (
                                    <div
                                        className="helper-div23"
                                        key={wannabe.id}
                                    >
                                        <div className="helper-div24">
                                            <img
                                                className="other-profile-pic"
                                                src={`${wannabe.profile_pic_url}`}
                                            />
                                            {wannabe.first} {wannabe.last}
                                        </div>
                                        <button
                                            className="submit-btn"
                                            onClick={() =>
                                                handleChange(
                                                    "Accept",
                                                    wannabe.id
                                                )
                                            }
                                        >
                                            Accept
                                        </button>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            {error && <div className="error">Oops, something went wrong!</div>}
        </div>
    );
}
