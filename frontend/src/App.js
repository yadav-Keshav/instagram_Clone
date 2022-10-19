
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import dotenv from 'dotenv';
import './App.css';
import Navbar from './components/navBar';
import CreatePostScreen from './screen/createPostScreen';
import HomeScreen from './screen/homeScreen';
import LoginScreen from './screen/loginScreen';
import Postscreen from './screen/postScreen';
import RegisterScreen from './screen/registerScreen';
import ProfileScreen from './screen/profileScreen';
dotenv.config();
function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route exact path="/create-post" element={<CreatePostScreen />} />
          <Route exact path="/post" element={<Postscreen />} />
          <Route exact path='/login' element={<LoginScreen />} />
          <Route exact path="/register" element={<RegisterScreen />} />
          <Route exact path="/profile" element={<ProfileScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
