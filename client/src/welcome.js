import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./authentification/registration";
import Login from "./authentification/login";
import ResetPassword from "./authentification/reset-password";

export function Welcome() {
    return (
        <div id="helper-div8">
            <h1 id="social-network-name">Inner Join.</h1>
            <a href="/">
                <img id="logo" src="/logo.png" alt="logo" />
            </a>
            <h3 id="social-network-slogan">
                Find someone to share your <br /> most secret data with.
            </h3>
            <BrowserRouter>
                <div id="helper-div12">
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/password/reset">
                        <ResetPassword />
                    </Route>
                </div>
            </BrowserRouter>
        </div>
    );
}
