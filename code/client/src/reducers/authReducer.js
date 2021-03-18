import {
    SET_USER_SUCCESS,
    SET_USER_REQUEST,
    SET_USER_FAILURE,
    SET_USER_SIGNUP_REQUEST,
    SET_USER_SIGNUP_SUCCESS,
    SET_USER_SIGNUP_FAILURE,
    SET_PARTNER_REQUEST,
    SET_PARTNER_SUCCESS,
    SET_PARTNER_FAILURE,
    SET_PARTNER_SIGNUP_REQUEST,
    SET_PARTNER_SIGNUP_SUCCESS,
    SET_PARTNER_SIGNUP_FAILURE,
} from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function authReducer(state = initialState, action) {
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

        case SET_PARTNER_SIGNUP_REQUEST:
            return {
                ...state
            };
        case SET_PARTNER_SIGNUP_SUCCESS:
            return {
                ...state
            };
        case SET_PARTNER_SIGNUP_FAILURE:
            return {
                ...state,
                errors: action.payload
            };

        case SET_PARTNER_REQUEST:
            return {
                ...state
            };
        case SET_PARTNER_SUCCESS:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case SET_PARTNER_FAILURE:
            return {
                ...state,
                errors: action.payload
            };

        default:
            return state;
    }
}
