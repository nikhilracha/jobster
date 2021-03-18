import { combineReducers } from "redux";

import authReducer from "./authReducer";
import coreReducer from "./coreReducer";
import { loadingBarReducer } from 'react-redux-loading-bar'

const appReducer = combineReducers({
    /* your app’s top-level reducers */
    auth: authReducer,
    postings: coreReducer,
    loadingBar: loadingBarReducer,
})

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }
    return appReducer(state, action)
}
export default rootReducer;