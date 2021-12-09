import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorIsVisible: false,
            draftBio: "",
        };
        this.saveBio = this.saveBio.bind(this);
        this.toggleTextarea = this.toggleTextarea.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    toggleTextarea() {
        this.setState({
            editorIsVisible: !this.state.editorIsVisible,
        });
    }

    handleChange(e) {
        this.setState({
            draftBio: e.target.value,
        });
    }

    saveBio() {
        (console.log("saveBio called"));
        fetch("/edit/bio.json", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify ({
                bio: this.state.draftBio,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data I got back in saveBio: ", data);
                this.props.updateBio(data.bio);
            });
    }

    render() {
        return (
            <div className="helper-div14">
                {!this.state.editorIsVisible && (
                    <div className="helper-div6">{this.props.bio}</div>
                )}
                {!this.state.editorIsVisible && !this.props.bio && (
                    <button
                        className="submit-btn"
                        onClick={() => this.toggleTextarea()}
                    >
                        Add Bio
                    </button>
                )}
                {!this.state.editorIsVisible && this.props.bio && (
                    <button
                        className="submit-btn"
                        onClick={() => this.toggleTextarea()}
                    >
                        Edit Bio
                    </button>
                )}
                {this.state.editorIsVisible && (
                    <div className="helper-div14">
                        <textarea
                            className="bio-editor"
                            onChange={this.handleChange}
                            defaultValue={`${this.props.bio}`}
                        />
                        <div className="helper-div15">
                            <button
                                className="submit-btn"
                                onClick={() => {
                                    this.saveBio();
                                    this.toggleTextarea();
                                }}
        
                            >
                                Save
                            </button>
                            <button
                                className="submit-btn exit-btn"
                                onClick={() => this.toggleTextarea()}
                            >
                                Exit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
