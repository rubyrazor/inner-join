export default function ProfilePic({ first, last, profilePicUrl, toggleUploader, imageSize }) {
    
    profilePicUrl = profilePicUrl || "/default.png";
   
    return (
        <>
            <img
                src={profilePicUrl}
                alt={`${first}, ${last}`}
                onClick={toggleUploader}
                className={imageSize} 
            />
        </>
    );
}
