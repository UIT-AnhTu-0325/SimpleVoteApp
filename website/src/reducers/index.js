import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import authReducers from "./auth.reducers";
import postReducers from "./post.reducers";

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducers,
  post: postReducers,
});

export default rootReducer;
