//TO DO
// #1 { rows }
// #2 error?.display


//REACT
import ReactDOM from "react-dom";
import { Welcome } from "./welcome";
import App from "./user-profile/app";
//REDUX
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./redux/reducer";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";

//SOCKET-IO
import { io } from "socket.io-client";
const socket = io();

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

let elem = (
    <Provider store={store}>
        <App />
    </Provider>
);

fetch("/id.json")
    .then((response) => response.json())
    .then((data) => {
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(elem, document.querySelector("main"));
        }
    });

socket.on("welcome", function (data) {
    console.log(data);
    socket.emit("thanks", {
        message: "Thank you. It is great to be here.",
    });
});
