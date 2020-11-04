import {
    SET_USER_SIGNUP_REQUEST,
    SET_USER_SIGNUP_SUCCESS,
    SET_USER_SIGNUP_FAILURE,
    SET_USER_REQUEST,
    SET_USER_SUCCESS,
    SET_USER_FAILURE,
    USER_LOGOUT
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";


function delay(t, v) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, v), t)
    });
}

export const asyncLogin = userData => {
    return async dispatch => {
        dispatch(userRequest(userData));
        try {
            const response = await axios.post("http://localhost:5000/api/login", userData, { timeout: 10000 });
            console.log("userdata", userData)
            const { token } = response.data;
            console.log("loggigin", response)
            if (token) {
                //set token to local storage
                localStorage.setItem("jwtToken", token);
                //set token to auth header
                setAuthToken(token);
                //Decode Token to get user data
                const decoded = jwt_decode(token);
                //Set the current user
                setTimeout(() => {
                    dispatch(setCurrentUser(decoded));
                }, 3000)
                return { status: "logged-in" }
            }
            // dispatch(setCurrentUser(decoded));
        }

        catch (errors) {
            console.log("errors in async login", errors.request);
            if (errors.message === 'Network Error') {
                return delay(5000).then(function () {
                    console.log("Network Error", errors);
                    dispatch(networkErrorHandler(errors, SET_USER_FAILURE));
                    return { error: "Trouble with the network" };
                });

            } else {
                return delay(5000).then(function () {
                    dispatch(errorHandler(errors, SET_USER_FAILURE));
                    if (errors.code === 'ECONNABORTED') {
                        return { error: "Time out retry again" }
                    }
                    return errors.response.data;
                });
            }

        }
    }
}


export const asyncRegister = userData => {
    return async dispatch => {
        dispatch(userSignupRequest(userData));
        try {
            const response = await axios.post("http://localhost:5000/api/register", userData, { timeout: 10000 });
            console.log("userdata", userData)
            const { status } = response.data;
            console.log("loggigin", response)
            if (status) {
                //Set the current user
                // setTimeout(() => {
                //     dispatch(setCurrentUser(decoded));
                // }, 3000)
                return { status: "registered" }
            }
        }

        catch (errors) {
            console.log("errors in async register", errors.request);
            if (errors.message === 'Network Error') {
                return delay(5000).then(function () {
                    console.log("Network Error", errors);
                    dispatch(networkErrorHandler(errors, SET_USER_SIGNUP_FAILURE));
                    return { error: "Trouble with the network" };
                });

            } else {
                return delay(5000).then(function () {
                    dispatch(errorHandler(errors, SET_USER_SIGNUP_FAILURE));
                    if (errors.code === 'ECONNABORTED') {
                        return { error: "Time out retry again" }
                    }
                    return errors.response.data;
                });
            }

        }
    }
}


//Network Error handler 
export const networkErrorHandler = (errors, type) => {
    return {
        type: type,
        payload: errors
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

//Set loggedin user

export const setCurrentUser = decoded => {
    return {
        type: SET_USER_SUCCESS,
        payload: decoded
    };
};

export const userRequest = data => {
    return {
        type: SET_USER_REQUEST,
        payload: data
    };
};

export const userSignupRequest = data => {
    return {
        type: SET_USER_SIGNUP_REQUEST,
        payload: data
    };
};

export const userSignupSuccess = decoded => {
    return {
        type: SET_USER_SIGNUP_SUCCESS,
        payload: decoded
    };
};

export const clearStore = () => {
    return {
        type: USER_LOGOUT
    };
}

// Log user out
export const logoutUser = () => dispatch => {
    try {
        if (localStorage.jwtToken) {
            // Remove token from localStorage

            //localStorage.removeItem("decoded");
            // Remove auth header for future requests
            setAuthToken(false);
            // Set current user to {} which will set isAuthenticated to false
            dispatch(setCurrentUser({}));
            //reset the store to default value
            dispatch(clearStore());
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("lastUpdtTime");
            //window.location.href = "/login";
        }
    }
    catch (errors) {
        console.log("jjj", errors)
    }
};
