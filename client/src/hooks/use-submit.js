import { useState } from "react";

export default function useSubmit(url, val) {
    const [error, setError] = useState(false);

    const submit = () => {
        // e.preventDefault() + add event as argument
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(val),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Logging in useSubmit: ", data);
                data.success ? location.replace("/") : setError(true);
            });
    };
    return [error, submit];
}
