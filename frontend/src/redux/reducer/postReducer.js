import { UPLOAD_IMAGE_FAIL, UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCESS } from "../constant/postConstant";

export const createPostReducer = (state = {}, action) => {
    switch (action.type) {
        case UPLOAD_IMAGE_REQUEST:
            return { loading: true };
        case UPLOAD_IMAGE_SUCESS:
            return { loading: false, message: action.message }
        case UPLOAD_IMAGE_FAIL:
            return { loading: false, error: action.error };
        default:
            return state;
    }
}