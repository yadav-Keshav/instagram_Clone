import React from 'react'
import downlod from '../../src/download.jpg';
export default function Postscreen() {
    return (
        <div className='post-screen-container'>
            <div className='post-wrapper' style={{ borderRadius: '0px', border: 'none' }}>
                <div className='top'>
                    <ul>
                        <li><a href="/profile" className='profile'><img src={downlod} /></a></li>
                        <li><a href="/id">Name</a></li>
                    </ul>
                    <ul>
                        <li><a href='/#'><i class="fa fa-bars"></i></a></li>
                    </ul>
                </div>
                <div className='post-content'>
                    <img src={downlod}></img>
                </div>
                <div className='post-reation'>
                    <ul>
                        <li><a href='#'><i class="fa fa-thumbs-up" aria-hidden="true"></i></a></li>
                        <li><a href='#'><i class="fa far fa-comment" aria-hidden="true"></i></a></li>
                    </ul>
                    <ul>
                        <li><a href='3'><i class="fa fa-bookmark"></i></a></li>
                    </ul>
                </div>
                <div className='post-comment'>
                    <ul>
                        <li><i class="far fa-smile"></i></li>
                        <li><input type='text' placeholder='Add comment...'></input></li>
                        <li><button>Post</button></li>
                    </ul>
                </div>
            </div>
            <div className='comment-wrapper'>
                <div className='top'>
                    <ul>
                        <li><a href="/profile" className='profile'><img src={downlod} /></a></li>
                        <li><a href="/id">Name</a></li>
                        <li>Edit</li>
                    </ul>
                </div>
                <div>
                    <p>Comment are here</p>
                </div>
            </div>
        </div>
    )
}
