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
                        "Exception thrown in fetching data in useEffect, find-people.js without searchTerm: ",
                        err
                    );
                    setError(true);
                });
        } else {
            fetch(`/users/${searchTerm}`)
                .then((res) => res.json())
                .then((data) => {
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
        <div className="helper-div17">
            <input
                className="search-fld"
                placeholder="Search"
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                data-cy="friends-search-fld"
            />
            <div className="helper-div18" data-cy="found-people-container">
                {users &&
                    users.map((user) => {
                        return (
                            <div className="helper-div19" key={user.id}>
                                <Link to={`/user/${user.id}`}>
                                    <img
                                        className="other-profile-pic"
                                        src={
                                            user.profile_pic_url ||
                                            "/default.png"
                                        }
                                    />
                                </Link>
                                <div className="helper-div4" data-cy="other-user-names">
                                    {user.first} {user.last}
                                </div>
                            </div>
                        );
                    })}
            </div>
            {error && <div className="error">Oops, something went wrong!</div>}
        </div>
    );
}
