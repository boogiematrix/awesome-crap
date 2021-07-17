import React from "react";
import { store } from './store'
import { Provider } from "react-redux";


const StoreProvider = ({ ...props }) => {

    return <Provider store={store} {...props} />;
};

export { StoreProvider };