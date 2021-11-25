import React from "react";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    submit() {
        console.log(
            "Loggin in submit, login: ",
            this.state.email,
            this.state.pass
        );
        fetch("/login.json", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
                pass: this.state.pass,
            }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                if (data.success == true) {
                    console.log("Successfull login");
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            });
    }
    render() {
        return (
            <div>
                <div>
                    <Link to="/">Click here to register</Link>
                </div>
                <div>
                    <Link to="/password/reset">Reset password</Link>
                </div>
                <div>
                    {this.state.error && (
                        <div className="error">Oops, something went wrong!</div>
                    )}
                </div>
                <input
                    name="email"
                    onChange={(e) => this.handleChange(e)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="pass"
                    onChange={(e) => this.handleChange(e)}
                    placeholder="Password"
                />
                <button onClick={() => this.submit()}>Submit</button>
            </div>
        );
    }
}
