import { Link } from "react-router-dom";
import useForm from "../hooks/use-form";
import useSubmit from "../hooks/use-submit";

export default function Login() {
    const [userInput, handleChange] = useForm({});
    const [error, submit] = useSubmit("/login.json", userInput);

    return (
        <>
            <div className="helper-div9">
                <form className="submit-fields">
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
                </form>
                <div className="helper-div10">
                    <button className="submit-btn" disabled={!(userInput.email && userInput.pass)} onClick={submit} data-cy="login-submit-btn">
                        Submit
                    </button>
                    <Link className="link" to="/">
                        Register
                    </Link>
                    <Link className="link" to="/password/reset" data-cy="login-reset-btn">
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
