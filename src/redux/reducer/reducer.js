import { combineReducers } from "redux";
import globalState from "./globalReducer";
import userState from './userReducer'

const reducer = combineReducers({
    globalState,
    userState,
})

export default reducer;