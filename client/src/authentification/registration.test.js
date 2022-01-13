import { fireEvent, render, screen } from "@testing-library/react";
import Registration from "./registration";
import { BrowserRouter } from "react-router-dom";

test("Register button is DISABELD unless input for all input-fields is provided", () => {
    const { container } = render(
        <BrowserRouter>
            <Registration />
        </BrowserRouter>
    );

    expect(container.querySelector("button").disabled).toBe(true);
});

test("Register button is ENABLED if input for all input-fields is provided", () => {
    const { container } = render(
        <BrowserRouter>
            <Registration />
        </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
        target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
        target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Emailaddress"), {
        target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "qwert" },
    });
    expect(container.querySelector("button").disabled).toBe(false);
});

test("Changes after button click ", () => {
    const { container } = render(
        <BrowserRouter>
            <Registration />
        </BrowserRouter>
    );
    //
    //All input-flds are filled out
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
        target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
        target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Emailaddress"), {
        target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "qwert" },
    });
    //
    //Mock submit function
    const myMockFn = jest.fn();
    //
    //Submit-btn is clicked
    fireEvent.click(container.querySelector("button"));
    //
    //Expectation
    expect(myMockFn.mock.calls.length).toBe(1);
});
