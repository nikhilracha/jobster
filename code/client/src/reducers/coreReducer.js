import {
    SET_SEARCH_REQUEST,
    SET_SEARCH_SUCCESS,
    SET_SEARCH_FAILURE
} from "../actions/types";


const initialState = {
    postings: []
};


export default function coreReducer(state = initialState, action) {
    switch (action.type) {

        case SET_SEARCH_REQUEST:
            return {
                ...state
            };
        case SET_SEARCH_SUCCESS:
            return {
                ...state,
                postings: action.payload
            };
        case SET_SEARCH_FAILURE:
            return {
                ...state,
                errors: action.payload
            };

        default:
            return state;
    }
}
