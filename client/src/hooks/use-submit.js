import { useState } from "react";

export default function useSubmit(url, value) {
    const [error, setError] = useState(false);

    const submit = () => {
        // e.preventDefault() + add event as argument
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        })
            .then((res) => res.json())
            .then((data) =>
                data.success ? location.replace("/") : setError(true)
            );
    };
    return [error, submit];
}
