import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receivedBio } from "../redux/user/slice";

export default function BioEditor() {
    const dispatch = useDispatch();
    const [editorIsVisible, setEditorIsVisible] = useState(false);
    const [draftBio, setDraftBio] = useState("");
    const bio = useSelector((state) => state.userData?.bio);

    function toggleTextarea() {
        setEditorIsVisible(!editorIsVisible);
    }

    function saveBio() {
        fetch("/edit/bio.json", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                bio: draftBio,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Logging response: ", data.bio);
                dispatch(receivedBio(data.bio));
            });
    }

    console.log("bio", bio);

    return (
        <div className="helper-div14">
            {!editorIsVisible && <div className="helper-div6">{bio}</div>}
            {!editorIsVisible && !bio && (
                <button className="submit-btn" onClick={() => toggleTextarea()}>
                    Add Bio
                </button>
            )}
            {!editorIsVisible && bio && (
                <button className="submit-btn" onClick={() => toggleTextarea()}>
                    Edit Bio
                </button>
            )}
            {editorIsVisible && (
                <div className="helper-div14">
                    <textarea
                        className="bio-editor"
                        onChange={(e) => setDraftBio(e.target.value)}
                        defaultValue={bio}
                    />
                    <div className="helper-div15">
                        <button
                            className="submit-btn"
                            onClick={() => {
                                saveBio();
                                toggleTextarea();
                            }}
                        >
                            Save
                        </button>
                        <button
                            className="submit-btn exit-btn"
                            onClick={() => toggleTextarea()}
                        >
                            Exit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}