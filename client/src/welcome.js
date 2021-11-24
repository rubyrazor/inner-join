import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";

export function Welcome() {
    return (
        <div>
            <h1>Welcome to LOGO</h1>
            <img src="/logo.png" alt="logo" />
            <BrowserRouter>
                <div>
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </div>
            </BrowserRouter>
        </div>
    );
}
