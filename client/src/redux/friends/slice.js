export default function friendsAndWannabesReducer(friendsAndWannabes=null, action) {
    if (action.type == "friends/receivedFriendsAndWannabes") {
        friendsAndWannabes = action.payload.friendsAndWannabes; 
    }
    return friendsAndWannabes;
}

export function receivedFriendsAndWannabes(friendsAndWannabes) {
    return {
        type: "friends/receivedFriendsAndWannabes",
        payload: { friendsAndWannabes },
    };
}