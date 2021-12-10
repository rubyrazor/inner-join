import { useSelector, useDispatch } from "react-redux";
import { receivedUploaderVisibility } from "../redux/uploader/slice";

export default function ProfilePic({ imageSize }) {
    const dispatch = useDispatch();
    const first = useSelector((state) => state.userData?.first);
    const last = useSelector((state) => state.userData?.last);
    const uploaderIsVisible = useSelector(state => state.uploaderIsVisible);
    let profilePicUrl = useSelector((state) => state.userData?.profilePicUrl);

    profilePicUrl = profilePicUrl || "/default.png";

    return (
        <>
            <img
                src={profilePicUrl}
                alt={`${first}, ${last}`}
                onClick={() =>
                    dispatch(receivedUploaderVisibility(uploaderIsVisible))
                }
                className={imageSize}
            />
        </>
    );
}
