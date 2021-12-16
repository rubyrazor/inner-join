import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { receivedProfilePicUrl } from "../redux/user/slice";
import { receivedUploaderVisibility } from "../redux/uploader/slice";


export default function Uploader() {
    const dispatch = useDispatch();
    const uploaderIsVisible = useSelector(state => state.uploaderIsVisible);
    const [newProfilePic, setNewProfilePic] = useState(null);
    const [error, setError] = useState(false);

    function handleChange(e) {
        setNewProfilePic(e.target.files[0]);
    }

    function upload() {
        const formData = new FormData();
        formData.append("file", newProfilePic);
        fetch("/upload/image.json", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    console.log(data.url);
                    dispatch(receivedProfilePicUrl(data.url));
                } else {
                    console.log(data);
                    setError(true);
                }
            });
    }

    return (
        <div id="modal" onClick={() => dispatch(receivedUploaderVisibility(uploaderIsVisible))} data-cy="uploader-modal">
            <div id="helper-div1" onClick={(e) => e.stopPropagation()}>
                <input
                    id="file-upload"
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    data-cy="uploader-file-input"
                />
                <button className="submit-btn uploader-submit-btn" onClick={upload} data-cy="uploader-submit-btn">
                    Upload
                </button>
                <div>
                    {error && (
                        <div className="error">Oops, something went wrong!</div>
                    )}
                </div>
            </div>
        </div>
    );
}