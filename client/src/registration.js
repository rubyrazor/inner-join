import React from "react";

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
        console.log(
            this.state.first,
            this.state.last,
            this.state.email,
            this.state.pass
        );
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
                    this.setState(
                        {
                            error: true,
                        },
                        () => console.log(this.state)
                    ); //setState is asynchronos, so we need to pass a callback; cannot simply log after calling setState.
                }
            });
    }
    render() {
        return (
            <div>
                <div>
                    {this.state.error && <div className="error">Oops!</div>}
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
