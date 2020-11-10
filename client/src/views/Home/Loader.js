import React from "react";
import LoadingBar from "react-redux-loading-bar";
import { Provider } from "react-redux";
import Store from '../../store';

function Loader() {
    return (
        <header>
            <Provider store={Store}>
                <LoadingBar
                    //loading={1}
                    style={{ height: "1.9px", opacity: "1", zIndex: "100000" }}
                />
            </Provider>
        </header>
    )
}

export default Loader;