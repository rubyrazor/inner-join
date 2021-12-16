import { useState } from "react";

export default function useSubmit(url, val) {
    const [error, setError] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(val),
        })
            .then((res) => res.json())
            .then((data) => {
                data.success ? location.replace("/") : setError(true);
            });
    };
    return [error, submit];
}
