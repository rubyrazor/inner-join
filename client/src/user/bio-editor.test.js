import BioEditor from "./bio-editor";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as immutableState from "redux-immutable-state-invariant";
import reducer from "../redux/reducer";
import { useDispatch } from "react-redux";
import { receivedBio } from "../redux/user/slice";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

test("If no bio is passed to BioEditor, an 'Add'-button is rendered", () => {
    const { container } = render(
        <Provider store={store}>
            <BioEditor />
        </Provider>
    );
    expect(container.querySelector("button").innerHTML).toContain("Add Bio");
});

test("If bio is passed, an 'Edit'-button is rendered", () => {
    // const dispatch = useDispatch();
    // dispatch(receivedBio("Some bio"));

    const bio = "Some bio";

    const { container } = render(
        <Provider store={store}>
            <BioEditor />
        </Provider>
    );

    expect(container.querySelector("button").innerHTML).toContain("Edit Bio");
});
