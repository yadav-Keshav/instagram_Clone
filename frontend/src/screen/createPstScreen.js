import React from 'react'

export default function CreatePostScreen() {
    return (
        <div className='create-form-wrapper'>
            <h2>Create a New Post</h2>
            <form>
                <input type='text' placeholder='Title' required ></input>
                <input type='text' placeholder='Description' required></input>
                <input type="file" required />
                <input type='submit' file-accept=".jpg, .png, .jpeg, .gif"></input>
            </form>
        </div>
    )
}
