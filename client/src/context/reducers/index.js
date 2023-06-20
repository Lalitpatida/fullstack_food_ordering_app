import {combineReducers}from "redux";
import userReducer from "./userReducer";
import AlertReducer from "./AlertReducer";
import productReducer from "./productReducer";
import allUserReducer from "./allUserReducer";
import cartReducer from "./cartReducer";
import displayCartReducer from "./displayCartReducer";
import ordersReducer from "./ordersReducer";

const myReducers=combineReducers({
    user : userReducer,
    alert: AlertReducer,
    products:productReducer,
    allUsers :allUserReducer,
    cart : cartReducer,
    isCart :displayCartReducer,
    orders: ordersReducer,
});

export default myReducers;