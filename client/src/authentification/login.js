import { Link } from "react-router-dom";
import useForm from "../hooks/use-form";
import useSubmit from "../hooks/use-submit";

export default function Login() {
    const [userInput, handleChange] = useForm({});
    const [error, submit] = useSubmit("/login.json", userInput);

    return (
        <>
            <div className="helper-div9">
                <div className="submit-fields">
                    <input
                        className="submit-field"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <input
                        className="submit-field"
                        type="password"
                        name="pass"
                        onChange={handleChange}
                        placeholder="Password"
                    />
                </div>
                <div className="helper-div10">
                    <button className="submit-btn" onClick={submit}>
                        Submit
                    </button>
                    <Link className="link" to="/">
                        Register
                    </Link>
                    <Link className="link" to="/password/reset">
                        Reset Password
                    </Link>
                </div>
            </div>
            <div className="error-message">
                {error && (
                    <div className="error">Oops, something went wrong!</div>
                )}
            </div>
        </>
    );
}
