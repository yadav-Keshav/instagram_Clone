import React, { useState, useEffect } from 'react'
import { uploadImageAction } from '../redux/action/postAction';
import Loading from '../components/loading';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/message';
export default function CreatePostScreen() {
    const dispatch = useDispatch();
    const uploadImage = useSelector(state => state.uploadImage);
    const { loading, error, message } = uploadImage;
    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const uploadImageHandler = (e) => {
        e.preventDefault();
        dispatch(uploadImageAction(image, title, body));
    }
    if (loading) {
        return <Loading />
    }
    return (
        <div className='create-form-wrapper'>
            <h2>Create a New Post</h2>
            {error && <Message variant="error">{error}</Message>}
            {message && <Message variant="sucess">{message}</Message>}
            <form>
                <input type='text' placeholder='Title' onChange={(e) => setTitle(e.target.value)} ></input>
                <input type='text' placeholder='Description' onChange={(e) => setBody(e.target.body)}></input>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
                <input type='submit' onClick={uploadImageHandler}></input>
            </form>
        </div>
    )
}
