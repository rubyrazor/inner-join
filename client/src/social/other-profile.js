import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import FriendBtn from "./friend-btn";

export default function OtherProfile() {
    const [otherProfile, setOtherProfile] = useState();
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState(false);

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        fetch(`/api/user/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.found) {
                    setOtherProfile({
                        first: data.user.first,
                        last: data.user.last,
                        profilePicUrl: data.user.profilePicUrl,
                        bio: data.user.bio,
                    });
                } else if (data.notFound) {
                    setNotFound(true);
                } else if (data.userId) {
                    history.replace(`/`);
                } else if (data.error) {
                    setError(true);
                }
            });
    }, [id]);

    return (
        <>
            <div className="helper-div2">
                {otherProfile && (
                    <>
                        <div className="helper-div3">
                            <img
                                className="bigProfilePic"
                                src={
                                    otherProfile.profilePicUrl ?? "/default.png"
                                }
                                alt={`${otherProfile.first}, ${otherProfile.last}`}
                            />
                            <div className="helper-div4">
                                {otherProfile.first} {otherProfile.last}
                            </div>
                        </div>
                        <div className="helper-div14">
                            <div className="helper-div6">
                                {otherProfile.bio}
                            </div>
                            <FriendBtn id={id} />
                        </div>
                    </>
                )}
                {error && (
                    <div className="error">Oops, something went wrong!</div>
                )}
            </div>
            <div>{notFound && <h1>User has not been found</h1>}</div>
        </>
    );
}
