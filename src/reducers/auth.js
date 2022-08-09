
import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => { //state.auth.authData
    switch (action.type) {
        case AUTH:
            //console.log(action?.data);
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, authDate: action?.data };
        case LOGOUT:
            localStorage.clear();
            return { ...state, authDate: null };
        // return { ...state, authData: null, loading: false, errors: null };
        //console.log({ ...state, authDate: null });
        default:
            return state;
    }
}

export default authReducer;
