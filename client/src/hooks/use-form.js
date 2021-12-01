import {useState} from "react";

export default function useForm() {
    const [userInput, setUserInput] = useState({});

    const handleChange = (e) => {
        setUserInput({
            ...userInput, 
            [e.target.name]: e.target.value
        });
    };

    return [userInput, handleChange];
}

// -------
// const handleImageAdd = (e) => setUserInput({
//     ...userInput, 
//     [e.target.name]: e.target.files[0]
// })

// WOuld have to add this to the return statement
