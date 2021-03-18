import {
    SET_SEARCH_REQUEST,
    SET_SEARCH_SUCCESS,
    SET_SEARCH_FAILURE
} from "./types";


import axios from "axios";



function delay(t, v) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, v), t)
    });
}

export const asyncSearch = searchData => {
    return async dispatch => {
        dispatch(searchRequest(searchData));
        try {
            const response = await axios.post("http://localhost:5000/api/search", searchData, { timeout: 10000 });
            console.log("search data", searchData)
            console.log("loggigin", response)
            console.log("data", response.data)
            //         //Set the postings data
            setTimeout(() => {
                dispatch(setSearch(response.data));
            }, 3000)
            return { postings: response.data }
        }
        catch (errors) {
            console.log("errors in async login", errors.request);
            if (errors.message === 'Network Error') {
                return delay(5000).then(function () {
                    console.log("Network Error", errors);
                    dispatch(networkErrorHandler(errors, SET_SEARCH_FAILURE));
                    return { error: "Trouble with the network" };
                });

            } else {
                return delay(5000).then(function () {
                    dispatch(errorHandler(errors, SET_SEARCH_FAILURE));
                    if (errors.code === 'ECONNABORTED') {
                        return { error: "Time out retry again" }
                    }
                    return errors.response.data;
                });
            }

        }
    }
}

export const searchRequest = data => {
    return {
        type: SET_SEARCH_REQUEST,
        payload: data
    };
};

export const setSearch = postings => {
    return {
        type: SET_SEARCH_SUCCESS,
        payload: postings
    };
};

//Error handler 
export const errorHandler = (errors, type) => {
    if (errors.code === 'ECONNABORTED') {
        return {
            type: type,
            payload: errors
        }
    }
    return {
        type: type,
        payload: errors.response.data
    };
};

//Network Error handler 
export const networkErrorHandler = (errors, type) => {
    return {
        type: type,
        payload: errors
    };
};