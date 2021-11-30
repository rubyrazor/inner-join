import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile({ first, last, profilePicUrl, bio, toggleUploader, updateBio }) {
    return (
        <div>
            <h1>USER PROFILE PAGE</h1>
            <div id="helper-div2">
                <div id="helper-div3">
                    <div id="helper-div4">
                        {first} {last}
                    </div>
                    <ProfilePic
                        imageSize="bigProfilePic"
                        profilePicUrl={profilePicUrl}
                        toggleUploader={toggleUploader}
                    />
                </div>
                <div id="helper-div5">
                    <BioEditor bio={bio} updateBio={updateBio} />
                </div>
            </div>
        </div>
    );
}

//#1 get the sizing of the image right
//#2 clickhandler which is added to profilepic is not working because it is not pointing anywhere; so we have to reestablish this