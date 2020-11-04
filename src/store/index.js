import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from '../reducers';
import { loadingBarMiddleware } from "react-redux-loading-bar";
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {}

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(thunk, loadingBarMiddleware(
            {
                promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
            })))
    // compose(
    //     applyMiddleware(thunk, loadingBarMiddleware(
    //         {
    //             promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
    //         }
    //     )),
    //     //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    //     window.__REDUX_DEVTOOLS_EXTENSION__
    //         ? window.__REDUX_DEVTOOLS_EXTENSION__()
    //         : f => f
    // )
);

export default store;
