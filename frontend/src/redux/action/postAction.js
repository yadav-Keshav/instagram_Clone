import axios from 'axios';
import { UPLOAD_IMAGE_FAIL, UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCESS } from '../constant/postConstant';

export const uploadImageAction = (image, title, body) => async (dispatch, getState) => {
    dispatch({ type: UPLOAD_IMAGE_REQUEST });
    try {
        const { userLogin: { userInfo: { token } } } = getState();
        const config = {
            headers: {
                "Content-Type": "application/json",
                "authorization": `${token}`
            }
        }
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "insta-clone");
        const { data } = await axios.post("https://api.cloudinary.com/v1_1/dhgn4khyo/image/upload", formData);
        const res = await axios.post("http://localhost:4000/posts/create-post", { title, body, photo: data.url }, config)
        dispatch({ type: UPLOAD_IMAGE_SUCESS, message: "sucessfully created" });
    }
    catch (err) {
        dispatch({ type: UPLOAD_IMAGE_FAIL, error: err.message });
    }
}