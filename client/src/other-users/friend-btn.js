import { useState, useEffect } from "react";

export default function FriendBtn({ id }) {
    const [btnText, setBtnText] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log(id);
        fetch(`/api/relation/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Logging received data: ", data);
                if (data.status === 0) {
                    setBtnText("Make Friend Request");
                } else if (data.status === 1) {
                    setBtnText("Cancel Friend Request");
                } else if (data.status === 2) {
                    setBtnText("Accept Friend Request");
                } else if (data.status === 3) {
                    setBtnText("Unfriend");
                } else {
                    setError({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("Exception thrown in useEffect, friend-btn: ", err);
                setError({ error: true });
            });
        return <div></div>;
    }, [id]);

    const handleChange = () => {
        const message = btnText.split(" ")[0];
        console.log(message);
        fetch(`/api/relation/update/${id}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                message: `${message}`,
            }),
        })
            .then((res) => res.json())
            .then(({ success }) => {
                if (success != true) {
                    setError(true);
                } else {
                    if (message === "Make") {
                        setBtnText("Cancel Friend Request");
                    } else if (message === "Cancel") {
                        setBtnText("Make Friend Request");
                    } else if (message === "Accept") {
                        setBtnText("Unfriend");
                    } else if (message === "Unfriend") {
                        setBtnText("Make Friend Request");
                    }
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
            <button className="submit-btn" onClick={handleChange}>
                {btnText}
            </button>
            {error && <div className="error">Oops, something went wrong!</div>}
        </>
    );
}
