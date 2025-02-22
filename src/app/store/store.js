import { configureStore } from "@reduxjs/toolkit";
// import todoReducer from "../../features/todo/todoSlice";
import rootReducer from "./reducers";

export const store = configureStore({
	reducer: rootReducer,
});
