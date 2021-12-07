export default function friendsAndWannabesReducer(friendsAndWannabes=null, action) {
    if (action.type == "friends/receivedFriendsAndWannabes") {
        friendsAndWannabes = action.payload.friendsAndWannabes; 
    }
    return friendsAndWannabes;
}

export function receiveFriendsAndWannabes(friendsAndWannabes) {
    return {
        type: "friends/receivedFriendsAndWannabes",
        payload: { friendsAndWannabes },
    };
}