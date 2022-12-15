import axios from "axios";
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constant/authConstant";

export const login = (email, password) => async (dispatch) => {

    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const { data } = await axios.post("http://localhost:4000/auth/login",
            {
                email, password
            }
        );
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
}



export const register = (name, email, password, pic) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST })
    try {
        const { data } = await axios.post("http://localhost:4000/auth/register",
            { name, email, password, pic }
        );

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}