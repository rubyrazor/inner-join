import { useSelector } from "react-redux";
import ProfilePic from "./profile-pic";
import BioEditor from "./bio-editor";

export default function Profile() {
    const first = useSelector((state) => state.userData?.first);
    const last = useSelector((state) => state.userData?.last);

    return (
        <div className="helper-div2">
            <div className="helper-div3">
                <ProfilePic
                    imageSize="bigProfilePic"
                />
                <div className="helper-div4">
                    {first} {last}
                </div>
            </div>
            <div id="helper-div5">
                <BioEditor />
            </div>
        </div>
    );
}
