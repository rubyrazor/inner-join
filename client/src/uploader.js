import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.userId,
            newProfilePic: null,
            error: false,
        };
        this.upload = this.upload.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log(e.target.files[0]);
        this.setState({
            newProfilePic: e.target.files[0],
        });
    }

    upload() {
        const formData = new FormData();
        formData.append("file", this.state.newProfilePic);
        fetch(`/upload/${this.userId}`, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json)
            .then((data) => {
                if (data.success) {
                    this.props.setUrl(data.profilePicUrl);
                } else {
                    this.setState({
                        error: true,
                    });
                }
            });
    }

    render() {
        return (
            <div id="modal" onClick={() => this.props.toggleUploader()}>
                <div id="helper-div1" onClick={(e) => e.stopPropagation()}>
                    <input
                        id="file-upload"
                        name="file"
                        type="file"
                        accept="image/*"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.upload}>Upload</button>
                    <div>
                        {this.state.error && (
                            <div className="error">
                                Oops, something went wrong!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

//image upload
//onChange-event => single value in state = image => then: user can say cancel or send/submit => modal closes => eventually profilepic will appear

// need multer + formData to handel this on server side
// need a new route "/upload"
// multer middleware => prepares the image in a format we need
// s3 to
// sends back single this: either URL from amazon or errormessage, if upload went wrong

// THEN: App is where all the user data is; image also has also to be stored in app.

//new column in users.sql for image-url
