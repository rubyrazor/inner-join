import { combineReducers } from "redux";
import friendsAndWannabesReducer from "./friends/slice.js";
import { chatReducer } from "./messages/slice";

const rootReducer = combineReducers({
    friendsAndWannabes: friendsAndWannabesReducer,
    chatMessages: chatReducer,
});

export default rootReducer;
