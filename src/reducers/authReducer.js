import {
    SET_USER_SUCCESS,
    SET_USER_REQUEST,
    SET_USER_FAILURE,
    SET_USER_SIGNUP_REQUEST,
    SET_USER_SIGNUP_SUCCESS,
    SET_USER_SIGNUP_FAILURE
} from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {

        case SET_USER_SIGNUP_REQUEST:
            return {
                ...state
            };
        case SET_USER_SIGNUP_SUCCESS:
            return {
                ...state
            };
        case SET_USER_SIGNUP_FAILURE:
            return {
                ...state,
                errors: action.payload
            };

        case SET_USER_REQUEST:
            return {
                ...state
            };
        case SET_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case SET_USER_FAILURE:
            return {
                ...state,
                errors: action.payload
            };

        default:
            return state;
    }
}
