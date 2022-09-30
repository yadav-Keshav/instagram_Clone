import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Postcard from '../components/postCard';
export default function HomeScreen() {
    
    return (
        <div className="home">
         <Postcard />
         <Postcard />
        </div>
    )
}
