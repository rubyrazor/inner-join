export default function ProfilePic({ first, last, profilePicUrl, toggleUploader }) {
    
    profilePicUrl = profilePicUrl || "/default.png";
   
    return (
        <>
            <img
                src={profilePicUrl}
                alt= {`${first}, ${last}`}
                id="profilePic"
                onClick = {toggleUploader}
            />
        </>
    );
}
