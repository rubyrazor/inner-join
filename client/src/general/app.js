import { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import ProfilePic from "../user/profile-pic";
import Uploader from "../user/uploader";
import Profile from "../user/profile";
import FindPeople from "../social/find-people";
import OtherProfile from "../social/other-profile";
import Friends from "../social/friends";
import Chat from "../social/chat";
import { useDispatch, useSelector } from "react-redux";
import { receivedUserData } from "../redux/user/slice";

export default function App() {
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const first = useSelector((state) => state.receivedUserData?.first);
    const last = useSelector((state) => state.receivedUserData?.last);
    const profilePicUrl = useSelector(
        (state) => state.receivedUserData?.profilePicUrl
    );
    const uploaderIsVisible = useSelector(state => state.uploaderIsVisible);

    useEffect(() => {
        fetch("/profile")
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(true);
                } else {
                    dispatch(receivedUserData(data));
                }
            });
    }, []);

    return (
        <>
            <BrowserRouter>
                <header>
                    <div className="helper-div13">
                        <img id="logoInApp" src="/logo2.png" alt="logo" />
                        <div className="brand-small">Inner Join.</div>
                    </div>
                    <Link className="link2" to="/">
                        Profile
                    </Link>
                    <Link className="link2" to="/users">
                        Find Friends
                    </Link>
                    <Link className="link2" to="/friends">
                        Friendships
                    </Link>
                    <Link className="link2" to="/chat">
                        Chat
                    </Link>
                    <a className="link2" href="/logout">
                        Logout
                    </a>
                    <ProfilePic
                        first={first}
                        last={last}
                        profilePicUrl={profilePicUrl}
                        imageSize="smallProfilePic"
                    />
                </header>
                <Route exact path="/users">
                    <FindPeople />
                </Route>
                <Route path="/user/:id">
                    <OtherProfile />
                </Route>
                <Route path="/friends">
                    <Friends />
                </Route>
                <Route path="/chat">
                    <Chat />
                </Route>
                <Route exact path="/">
                    <Profile />
                    <section>{uploaderIsVisible && <Uploader />}</section>
                </Route>
            </BrowserRouter>
            <div className="error-message">
                {error && (
                    <div className="error">Oops, something went wrong!</div>
                )}
            </div>
        </>
    );
}