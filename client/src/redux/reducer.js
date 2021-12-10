import { combineReducers } from "redux";
import friendsAndWannabesReducer from "./friends/slice.js";
import chatReducer from "./messages/slice";
import userDataReducer from "./user/slice";
import uploaderVisibilityReducer from "./uploader/slice";

const rootReducer = combineReducers({
    friendsAndWannabes: friendsAndWannabesReducer,
    chatMessages: chatReducer,
    userData: userDataReducer,
    uploaderIsVisible: uploaderVisibilityReducer,
});

export default rootReducer;
