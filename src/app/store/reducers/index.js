import { combineReducers } from "redux";
import userAuthReducers from "./userAuthReducers";
import todoReducer from "../../../features/todo/todoSlice";

const rootReducer = combineReducers({
	userAuth: userAuthReducers,
	todo: todoReducer,
});

export default rootReducer;
