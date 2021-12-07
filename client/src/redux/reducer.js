import { combineReducers } from "redux";
import friendsAndWannabesReducer from "./friends/slice.js";

const rootReducer = combineReducers({
    friendsAndWannabes: friendsAndWannabesReducer,
});

export default rootReducer;
