import {
    SET_USER_SIGNUP_REQUEST,
    SET_USER_SIGNUP_SUCCESS,
    SET_USER_SIGNUP_FAILURE,
    SET_PARTNER_SIGNUP_REQUEST,
    SET_PARTNER_SIGNUP_SUCCESS,
    SET_PARTNER_SIGNUP_FAILURE,
    SET_USER_REQUEST,
    SET_USER_SUCCESS,
    SET_USER_FAILURE,
    SET_PARTNER_REQUEST,
    SET_PARTNER_SUCCESS,
    SET_PARTNER_FAILURE,
    USER_LOGOUT,
    PARTNER_LOGOUT
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";


function delay(t, v) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, v), t)
    });
}


export const asyncPartnerLogin = userData => {
    return async dispatch => {
        dispatch(partnerRequest(userData));
        try {
            const response = await axios.post("http://localhost:5000/api/p-login", userData, { timeout: 10000 });
            console.log("userdata", userData)
            const { token, tkn_type } = response.data;
            console.log("loggigin", response)
            if (tkn_type === 'partner') {
                if (token) {
                    console.log("Token", token)
                    //set token to local storage
                    localStorage.setItem("pt_jwtToken", token);
                    //set token to auth header
                    setAuthToken(token);
                    //Decode Token to get user data
                    const decoded = jwt_decode(token);
                    //Set the current user
                    setTimeout(() => {
                        dispatch(setCurrentPartner(decoded));
                    }, 3000)
                    return { status: "logged-in" }
                }
            }
            // dispatch(setCurrentUser(decoded));
        }

        catch (errors) {
            console.log("errors in async login", errors.request);
            if (errors.message === 'Network Error') {
                return delay(5000).then(function () {
                    console.log("Network Error", errors);
                    dispatch(networkErrorHandler(errors, SET_PARTNER_FAILURE));
                    return { error: "Trouble with the network" };
                });

            } else {
                return delay(5000).then(function () {
                    dispatch(errorHandler(errors, SET_PARTNER_FAILURE));
                    if (errors.code === 'ECONNABORTED') {
                        return { error: "Time out retry again" }
                    }
                    return errors.response.data;
                });
            }

        }
    }
}

export const asyncPartnerRegister = userData => {
    return async dispatch => {
        dispatch(userSignupRequest(userData));
        try {
            const response = await axios.post("http://localhost:5000/api/p-register", userData, { timeout: 10000 });
            console.log("userdata", userData)
            const { status } = response.data;
            console.log("loggigin", response)
            if (status) {
                //Set the current user
                setTimeout(() => {
                    dispatch(partnerSignupSuccess());
                }, 3000)
                return { status: "registered" }
            }
        }

        catch (errors) {
            console.log("errors in async register", errors.request);
            if (errors.message === 'Network Error') {
                return delay(5000).then(function () {
                    console.log("Network Error", errors);
                    dispatch(networkErrorHandler(errors, SET_PARTNER_SIGNUP_FAILURE));
                    return { error: "Trouble with the network" };
                });

            } else {
                return delay(5000).then(function () {
                    dispatch(errorHandler(errors, SET_PARTNER_SIGNUP_FAILURE));
                    if (errors.code === 'ECONNABORTED') {
                        return { error: "Time out retry again" }
                    }
                    return errors.response.data;
                });
            }

        }
    }
}

export const asyncPartnerTokenUpdate = userData => {
    return async dispatch => {
        dispatch(userRequest(userData));
        try {
            const response = await axios.post("http://localhost:5000/api/p-tkn-update", userData, { timeout: 10000 });
            console.log("userdata", userData)
            const { token, tkn_type } = response.data;
            console.log("loggigin", response)
            if (tkn_type === 'partner') {
                if (token) {
                    //set token to local storage
                    localStorage.removeItem("pt_jwtToken");
                    localStorage.removeItem("lastUpdtTime");
                    localStorage.setItem("pt_jwtToken", token);
                    setAuthToken(false);
                    //set token to auth header
                    setAuthToken(token);
                    //Decode Token to get user data
                    const decoded = jwt_decode(token);
                    //Set the current user
                    setTimeout(() => {
                        dispatch(setCurrentPartner(decoded));
                    }, 1500)
                    return { status: "logged-in" }
                }
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



export const asyncLogin = userData => {
    return async dispatch => {
        dispatch(userRequest(userData));
        try {
            const response = await axios.post("http://localhost:5000/api/login", userData, { timeout: 10000 });
            console.log("userdata", userData)
            const { token, tkn_type } = response.data;
            console.log("loggigin", response)
            if (tkn_type === 'user') {
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


export const asyncTokenUpdate = userData => {
    return async dispatch => {
        dispatch(userRequest(userData));
        try {
            const response = await axios.post("http://localhost:5000/api/tkn-update", userData, { timeout: 10000 });
            console.log("userdata", userData)
            const { token, tkn_type } = response.data;
            console.log("loggigin", response)
            if (tkn_type === 'user') {
                if (token) {
                    //set token to local storage
                    localStorage.removeItem("jwtToken");
                    localStorage.removeItem("lastUpdtTime");
                    localStorage.setItem("jwtToken", token);
                    setAuthToken(false);
                    //set token to auth header
                    setAuthToken(token);
                    //Decode Token to get user data
                    const decoded = jwt_decode(token);
                    //Set the current user
                    setTimeout(() => {
                        dispatch(setCurrentUser(decoded));
                    }, 1500)
                    return { status: "logged-in" }
                }
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
                setTimeout(() => {
                    dispatch(userSignupSuccess());
                }, 3000)
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


export const partnerRequest = data => {
    return {
        type: SET_PARTNER_REQUEST,
        payload: data
    };
};

export const setCurrentPartner = decoded => {
    return {
        type: SET_PARTNER_SUCCESS,
        payload: decoded
    };
};

export const partnerSignupRequest = data => {
    return {
        type: SET_PARTNER_SIGNUP_REQUEST,
        payload: data
    };
};

export const partnerSignupSuccess = () => {
    return {
        type: SET_PARTNER_SIGNUP_SUCCESS,
        //payload: decoded
    };
};

export const userSignupRequest = data => {
    return {
        type: SET_USER_SIGNUP_REQUEST,
        payload: data
    };
};

export const userSignupSuccess = () => {
    return {
        type: SET_USER_SIGNUP_SUCCESS,
        //payload: decoded
    };
};

export const clearStore = () => {
    return {
        type: USER_LOGOUT
    };
}

export const clearPartnerStore = () => {
    return {
        type: PARTNER_LOGOUT
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

// Log user out
export const logoutPartner = () => dispatch => {
    try {
        if (localStorage.pt_jwtToken) {
            // Remove token from localStorage

            //localStorage.removeItem("decoded");
            // Remove auth header for future requests
            setAuthToken(false);
            // Set current user to {} which will set isAuthenticated to false
            dispatch(setCurrentPartner({}));
            //reset the store to default value
            dispatch(clearPartnerStore());
            localStorage.removeItem("pt_jwtToken");
            localStorage.removeItem("lastUpdtTime");
            //window.location.href = "/login";
        }
    }
    catch (errors) {
        console.log("jjj", errors)
    }
};
