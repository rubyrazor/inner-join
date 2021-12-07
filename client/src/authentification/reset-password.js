import { Component } from "react";
import { Link } from "react-router-dom";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 1,
            error: false,
        };
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    submitStage1() {
        fetch("/password/reset.json", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
            }),
        })
            .then((resp) => resp.json())
            .then((resp) => {
                if (resp.success) {
                    this.setState({
                        stage: 2,
                    });
                } else {
                    this.setState({
                        error: true,
                    });
                }
            });
    }
    submitStage2() {
        fetch("/password/verification.json", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
                newPass: this.state.newPass,
                verCode: this.state.verCode,
            }),
        })
            .then((resp) => resp.json())
            .then((resp) => {
                if (resp.success) {
                    this.setState({
                        stage: 3,
                    });
                } else {
                    this.setState({
                        error: true,
                    });
                }
            });
    }
    resetPassword() {
        if (this.state.stage === 1) {
            return (
                <>
                    <div className="helper-div9">
                        <input
                            className="submit-field"
                            name="email"
                            onChange={(e) => this.handleChange(e)}
                            placeholder="Email"
                        />
                        <div className="helper-div10">
                            <button
                                className="submit-btn"
                                onClick={() => this.submitStage1()}
                            >
                                Submit
                            </button>
                            <Link className="link" to="/">
                                Register
                            </Link>
                        </div>
                    </div>
                    <div className="error-message">
                        {this.state.error && (
                            <div className="error">
                                Oops, something went wrong!
                            </div>
                        )}
                    </div>
                </>
            );
        } else if (this.state.stage === 2) {
            return (
                <div>
                    <h3>
                        An email with a verification code has been send to you
                    </h3>
                    <div>
                        <input
                            type="password"
                            name="newPass"
                            onChange={(e) => this.handleChange(e)}
                            placeholder="New Password"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="verCode"
                            onChange={(e) => this.handleChange(e)}
                            placeholder="Verification code"
                        />
                    </div>
                    <button onClick={() => this.submitStage2()}>Submit</button>
                    <div>
                        {this.state.error && (
                            <div className="error">
                                Oops, something went wrong!
                            </div>
                        )}
                    </div>
                </div>
            );
        } else if (this.state.stage === 3) {
            return (
                <div>
                    <h1>Password successfully updated!</h1>
                    <Link to="/login">Click here to log in</Link>
                </div>
            );
        }
    }
    render() {
        return <div>{this.resetPassword()}</div>;
    }
}
