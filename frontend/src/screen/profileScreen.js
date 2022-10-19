import React from 'react'
import profile from '../download.jpg';
export default function ProfileScreen() {
  return (
    <div className='profile-screen'>
      <div className='profile-screen-top'>
        <div className='profile-screen-image'>
          <img src={profile} alt="profile" />
        </div>
        <div className='profile-setting'>
         <ul>
          <li>Keshav Kumar</li>
          <li>Edit Profile</li>
          <li>setting</li>
         </ul>
         <ul>
          <li>5 Posts</li>
          <li>20 followers</li>
          <li>20 following</li>
         </ul>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}
