import { useState, useEffect } from "react";

export default function FindPeople() {
    const [users, setUsers] = useState();
    const [searchTerm, setSearchTerm] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log("Got here1!");
        let abort;
        if (!searchTerm) {
            fetch("/users/recent.json")
                .then((res) => res.json())
                .then((data) => {
                    setUsers(data);
                })
                .catch((err) => {
                    console.log(
                        "Exception thrown in fetching data in useEffect, findpeople.js: ",
                        err
                    );
                    setError(true);
                });
        } else {
            fetch(`/users/${searchTerm}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("Logging in fetch: ", data);
                    if (!abort) {
                        setUsers(data);
                    }
                });
        }
        return () => {
            abort = true;
        };
    }, [searchTerm]);

    return (
        <>
            <input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {users &&
                users.map((user) => {
                    return (
                        <div key={user.id}>
                            <img src={`${user.profile_pic_url}`} />
                            <h3>{user.first} {user.last}</h3>
                            <p>{user.bio}</p>
                        </div>
                    );
                })}
            {error && <div className="error">Oops, something went wrong!</div>}
        </>
    );
}
