import { Link } from "react-router-dom";
import useForm from "../hooks/use-form";
import useSubmit from "../hooks/use-submit";

export default function Registration() {
    const [userInput, handleChange] = useForm();
    const [error, submit] = useSubmit("/registration.json", userInput);

    return (
        <>
            <div className="helper-div9">
                <form className="submit-fields">
                    <input
                        className="submit-field"
                        name="first"
                        onChange={handleChange}
                        placeholder="First Name"
                    />
                    <input
                        className="submit-field"
                        name="last"
                        onChange={handleChange}
                        placeholder="Last Name"
                    />
                    <input
                        className="submit-field"
                        name="email"
                        onChange={handleChange}
                        placeholder="Emailaddress"
                    />
                    <input
                        className="submit-field"
                        type="password"
                        name="pass"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </form>
                <div className="helper-div10">
                    <button
                        data-cy="registration-page-submit-btn"
                        disabled={
                            !(
                                userInput.first &&
                                userInput.last &&
                                userInput.email &&
                                userInput.pass
                            )
                        }
                        className="submit-btn"
                        onClick={submit}
                    >
                        Submit
                    </button>
                    <Link className="link" to="/login" data-cy="login-btn">
                        Login
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