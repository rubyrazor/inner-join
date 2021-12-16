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
                dispatch(receivedBio(data.bio));
            });
    }

    return (
        <div className="helper-div14">
            {!editorIsVisible && <div className="helper-div6" data-cy="profile-page-bio">{bio}</div>}
            {!editorIsVisible && !bio && (
                <button className="submit-btn" onClick={() => toggleTextarea()} data-cy="add-bio-btn">
                    Add Bio
                </button>
            )}
            {!editorIsVisible && bio && (
                <button className="submit-btn" onClick={() => toggleTextarea()} data-cy="edit-bio-btn">
                    Edit Bio
                </button>
            )}
            {editorIsVisible && (
                <div className="helper-div14">
                    <textarea
                        className="bio-editor"
                        onChange={(e) => setDraftBio(e.target.value)}
                        defaultValue={bio}
                        data-cy="profile-page-bio-editor"
                    />
                    <div className="helper-div15">
                        <button
                            className="submit-btn"
                            onClick={() => {
                                saveBio();
                                toggleTextarea();
                            }}
                            data-cy="save-bio-btn"
                        >
                            Save
                        </button>
                        <button
                            className="submit-btn exit-btn"
                            onClick={() => toggleTextarea()}
                            data-cy="exit-bio-btn"
                        >
                            Exit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}