export default function userDataReducer(userData = null, action) {
    if (action.type == "user/receivedUserData") {
        userData = action.payload.userData;
    }
    if (action.type == "user/receivedBio") {
        userData = {...userData, bio: action.payload.bio};
    } 
    if (action.type == "user/receivedProfilePicUrl") {
        userData = {...userData, profilePicUrl: action.payload.profilePicUrl};
    }
    return userData;
}

export function receivedUserData(userData) {
    return {
        type: "user/receivedUserData",
        payload: { userData },
    };
}

export function receivedBio(bio) {
    return {
        type: "user/receivedBio",
        payload: { bio },
    };
}

export function receivedProfilePicUrl(profilePicUrl) {
    return {
        type: "user/receivedProfilePicUrl",
        payload: { profilePicUrl },
    };
}
