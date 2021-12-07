import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriendsAndWannabes } from "./redux/friends/slice";

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
                    console.log("Logging friendsAndWannabes: ", resp);
                    dispatch(receiveFriendsAndWannabes(resp));
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
        <>
            <div>List of Friends</div>
            <div className="friends">
                {friends &&
                    friends.map((friend) => {
                        return (
                            <>
                                <div className="friend" key={friend.id}>
                                    <img src={`${friend.profile_pic_url}`} />
                                    {friend.first}
                                    {friend.last}
                                </div>
                                <button
                                    onClick={handleChange(
                                        "Unfriend",
                                        friend.id
                                    )}
                                >
                                    Unfriend
                                </button>
                            </>
                        );
                    })}
            </div>
            <div>List of Wannabes</div>
            <div className="wannabes">
                {wannabes &&
                    wannabes.map((wannabe) => {
                        return (
                            <>
                                <div className="wannabe" key={wannabe.id}>
                                    <img src={`${wannabe.profile_pic_url}`} />
                                    {wannabe.first}
                                    {wannabe.last}
                                </div>
                                <button
                                    onClick={handleChange("Accept", wannabe.id)}
                                >
                                    Accept
                                </button>
                            </>
                        );
                    })}
            </div>
            {error && <div className="error">Oops, something went wrong!</div>}
        </>
    );
}
