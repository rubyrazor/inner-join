import { Link } from "react-router-dom";
import useForm from "./hooks/use-form";
import useSubmit from "./hooks/use-submit";

export default function Login() {
    const [userInput, handleChange] = useForm({});
    const [error, submit] = useSubmit("/login.json", userInput);

    return (
        <div>
            <div>
                <Link to="/">Register</Link>
            </div>
            <div>
                <Link to="/password/reset">Reset Password</Link>
            </div>
            <div>
                {error && (
                    <div className="error">Oops, something went wrong!</div>
                )}
            </div>
            <input name="email" onChange={handleChange} placeholder="Email" />
            <input
                type="password"
                name="pass"
                onChange={handleChange}
                placeholder="Password"
            />
            <button onClick={submit}>Submit</button>
        </div>
    );
}
