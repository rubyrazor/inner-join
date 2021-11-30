import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        fetch("/upload/image.json", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    this.props.setUrl(data.url);
                    this.props.toggleUploader();
                    this.setState({
                        error: false,
                    });
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
