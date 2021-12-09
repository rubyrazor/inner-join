import ProfilePic from "./profile-pic";
import BioEditor from "./bio-editor";

export default function Profile({
    first,
    last,
    profilePicUrl,
    bio,
    toggleUploader,
    updateBio,
}) {
    return (
        <div className="helper-div2">
            <div className="helper-div3">
                <ProfilePic
                    imageSize="bigProfilePic"
                    profilePicUrl={profilePicUrl}
                    toggleUploader={toggleUploader}
                />
                <div className="helper-div4">
                    {first} {last}
                </div>
            </div>
            <div id="helper-div5">
                <BioEditor bio={bio} updateBio={updateBio} />
            </div>
        </div>
    );
}

//#1 get the sizing of the image right
//#2 clickhandler which is added to profilepic is not working because it is not pointing anywhere; so we have to reestablish this
