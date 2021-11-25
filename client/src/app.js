import { Component } from "react";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            first: "Ruben",
            last: "Langer",
            email: "",
            userId: "",
            profilePicUrl: "",
            uploaderIsVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.setUrl = this.setUrl.bind(this);
    }

    componentDidMount() {
        console.log("App component mounted");
        //Make a fetch request to get data for currently logged in user (need not to send data, because the server gets it form the cookie); never return the entire data (best practice: list explicitly the fields you need, and don't retrieve data you dont need); e.g. dont need the pw
    }

    toggleUploader() {
        console.log("Toggle upload running");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    setUrl(val) {
        this.setState({
            profilePicUrl: val,
        });
    }

    render() {
        return (
            <>
                <header>
                    <img id="logoInApp" src="/logo.png" alt="logo" />
                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        profilePicUrl={this.state.profilePicUrl}
                        toggleUploader={this.toggleUploader}
                    />
                </header>
                <section>
                    {this.state.uploaderIsVisible && (
                        <Uploader 
                            userId={this.state.userId}
                            setUrl={this.setUrl}
                            toggleUploader={this.toggleUploader}
                        />
                    )}
                </section>
            </>
        );
    }
}
