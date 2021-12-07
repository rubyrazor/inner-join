import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./authentification/registration";
import Login from "./authentification/login";
import ResetPassword from "./authentification/reset-password";

export function Welcome() {
    return (
        <div id="helper-div8">
            <h1 id="brand-name">Inner Join.</h1>
            {/* <img id="background"src="/background2.png" alt="background image" /> */}
            <img id="logo" src="/logo2.png" alt="logo" />
            <h3 id="jingle">Find someone to share your <br/> most secret data with.</h3>
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
