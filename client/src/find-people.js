import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [users, setUsers] = useState();
    const [searchTerm, setSearchTerm] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        let abort;
        if (!searchTerm) {
            fetch("/users/recent.json")
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setUsers(data);
                })
                .catch((err) => {
                    console.log(
                        "Exception thrown in fetching data in useEffect, findpeople.js without searchTerm: ",
                        err
                    );
                    setError(true);
                });
        } else {
            fetch(`/users/${searchTerm}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("Logging in fetch, data: ", data);
                    if (!abort) {
                        setUsers(data);
                    } else if (error === true) {
                        setError(true);
                    }
                })
                .catch((err) => {
                    console.log(
                        "Exception thrown when fetching data in useEffect, findpeople.js with searchTerm: ",
                        err
                    );
                    setError(true);
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
                            <Link to={`/user/${user.id}`}>
                                <img src={`${user.profile_pic_url}`} />
                            </Link>
                            <h3>
                                {user.first} {user.last}
                            </h3>
                        </div>
                    );
                })}
            {error && <div className="error">Oops, something went wrong!</div>}
        </>
    );
}
