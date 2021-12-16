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
                                disabled={!email}
                                onClick={() => submitStage1()}
                                data-cy="reset-submit-btn"
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
                    <div className="helper-div29">
                        <div>
                            <div>
                                <input
                                    className="submit-field"
                                    type="password"
                                    name="newPass"
                                    onChange={(e) => handleChange(e)}
                                    placeholder="New Password"
                                />
                            </div>
                            <div>
                                <input
                                    className="submit-field"
                                    type="password"
                                    name="verCode"
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Verification code"
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => submitStage2()}
                            className="submit-btn"
                            data-cy="verCode-submit-btn"
                        >
                            Submit
                        </button>
                    </div>
                    {!error && (
                        <div className="verification-code-msg">
                            An email containing a verification code <br /> has
                            been send to you
                        </div>
                    )}
                    <div>
                        {error && (
                            <div className="error-message" data-cy="error-msg">
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
