import { useState } from "react";
import { Link } from "react-router-dom";

export default function ResetPassword() {
    const [stage, setStage] = useState(1);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState();
    const [newPass, setNewPass] = useState();
    const [verCode, setVerCode] = useState();

    const handleChange = (e) => {
        if (e.target.name == "email") {
            setEmail(e.target.value);
        } else if (e.target.name == "newPass") {
            setNewPass(e.target.value);
        } else {
            setVerCode(e.target.value);
        }
    };

    const submitStage1 = () => {
        fetch("/password/reset.json", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email: email,
            }),
        })
            .then((resp) => resp.json())
            .then((resp) => {
                if (resp.success) {
                    setStage(2);
                } else {
                    setStage(2);
                }
            });
    };

    const submitStage2 = () => {
        fetch("/password/verification.json", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                newPass: newPass,
                verCode: verCode,
            }),
        })
            .then((resp) => resp.json())
            .then((resp) => {
                if (resp.success) {
                    setStage(3);
                } else {
                    setError(true);
                }
            });
    };

    const resetPassword = () => {
        if (stage === 1) {
            return (
                <>
                    <div className="helper-div9">
                        <input
                            className="submit-field"
                            name="email"
                            onChange={(e) => handleChange(e)}
                            placeholder="Email"
                        />
                        <div className="helper-div10">
                            <button
                                className="submit-btn"
                                onClick={() => submitStage1()}
                            >
                                Submit
                            </button>
                            <Link className="link" to="/">
                                Register
                            </Link>
                        </div>
                    </div>
                    <div className="error-message">
                        {error && (
                            <div className="error">
                                Oops, something went wrong!
                            </div>
                        )}
                    </div>
                </>
            );
        } else if (stage === 2) {
            return (
                <div>
                    <h3>
                        An email with a verification code has been send to you
                    </h3>
                    <div>
                        <input
                            type="password"
                            name="newPass"
                            onChange={(e) => handleChange(e)}
                            placeholder="New Password"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="verCode"
                            onChange={(e) => handleChange(e)}
                            placeholder="Verification code"
                        />
                    </div>
                    <button onClick={() => submitStage2()}>Submit</button>
                    <div>
                        {error && (
                            <div className="error">
                                Oops, something went wrong!
                            </div>
                        )}
                    </div>
                </div>
            );
        } else if (stage === 3) {
            return (
                <div>
                    <h1>Password successfully updated!</h1>
                    <Link to="/login">Click here to log in</Link>
                </div>
            );
        }
    };
    return <div>{resetPassword()}</div>;
}