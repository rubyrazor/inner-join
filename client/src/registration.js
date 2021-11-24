import React from "react";
import { Link } from "react-router-dom";


export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value, //Before ES6: var obj = {}; obj[e.target.name] = ...
        });
    }
    submit() {
        fetch("/registration.json", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                pass: this.state.pass,
            }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    }); //setState is asynchronos, so we need to pass a callback "error: true}, () => console.log(this.state)")"; cannot simply log after calling setState.
                }
            });
    }
    render() {
        return (
            <div>
                <Link to="/login">Click here to log in</Link>;
                <div>
                    {this.state.error && (
                        <div className="error">Oops, something went wrong!</div>
                    )}
                </div>
                <input
                    name="first"
                    onChange={(e) => this.handleChange(e)}
                    placeholder="Name"
                />
                <input
                    name="last"
                    onChange={(e) => this.handleChange(e)}
                    placeholder="Last name"
                />
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