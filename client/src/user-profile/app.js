import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import ProfilePic from "./profile-pic";
import Uploader from "../uploader";
import Profile from "./profile";
import FindPeople from "../find-people";
import OtherProfile from "../other-profile";
import Friends from "../friends";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            email: "",
            profilePicUrl: "",
            bio: "",
            uploaderIsVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.setUrl = this.setUrl.bind(this);
        this.updateBio = this.updateBio.bind(this);
    }

    componentDidMount() {
        fetch("/profile")
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    this.setState({
                        error: true,
                    });
                } else {
                    this.setState(
                        {
                            first: data.first,
                            last: data.last,
                            profilePicUrl: data.profilePicUrl,
                            bio: data.bio,
                        },
                        () => console.log(this.state)
                    );
                }
            });
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    setUrl(val) {
        this.setState({
            profilePicUrl: val,
        });
    }

    updateBio(val) {
        console.log("loggin in updateBio: ", val);
        this.setState({
            bio: val,
        });
    }

    render() {
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
                        <ProfilePic
                            first={this.state.first}
                            last={this.state.last}
                            profilePicUrl={this.state.profilePicUrl}
                            toggleUploader={this.toggleUploader}
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
                    <Route exact path="/">
                        <Profile
                            first={this.state.first}
                            last={this.state.last}
                            profilePicUrl={this.state.profilePicUrl}
                            toggleUploader={this.toggleUploader}
                            bio={this.state.bio}
                            updateBio={this.updateBio}
                        />
                        <section>
                            {this.state.uploaderIsVisible && (
                                <Uploader
                                    setUrl={this.setUrl}
                                    toggleUploader={this.toggleUploader}
                                />
                            )}
                        </section>
                    </Route>
                    <footer>
                        <a className="link2" href="/logout">
                            Logout
                        </a>
                    </footer>
                </BrowserRouter>
            </>
        );
    }
}
