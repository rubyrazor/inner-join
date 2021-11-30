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
            <div>
                {!this.state.editorIsVisible && <div id="helper-div6">{this.props.bio}</div>}
                {!this.state.editorIsVisible && !this.props.bio && (
                    <button onClick={() => this.toggleTextarea()}>
                        Add Bio
                    </button>
                )}
                {!this.state.editorIsVisible && this.props.bio && (
                    <button onClick={() => this.toggleTextarea()}>
                        Edit Bio
                    </button>
                )}
                {this.state.editorIsVisible && (
                    <>
                        <textarea
                            onChange={this.handleChange}
                            defaultValue={`${this.props.bio}`}
                        />
                        <div>
                            <button onClick={() => this.saveBio()}>Save</button>
                            <button onClick={() => this.toggleTextarea()}>Exit</button>
                        </div>
                    </>
                )}
            </div>
        );
    }
}
