import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import MoviesPage from './components/MoviesPage';
import ActorsPage from './components/ActorsPage';
import MovieDetails from './components/MovieDetails';
import ActorDetails from './components/ActorDetails';
import CreateReview from './components/CreateReview';
import Watchlist from './components/Watchlist';
import Reviews from './components/Reviews';
import { useEffect, useState } from 'react';
import AllReviews from './components/AllReviews';
import UserPage from './components/UserPage';
import MyPage from './components/MyPage';
import Genre from './components/Genre';


function App() {
  const [userRole, setUserRole] = useState('');
    useEffect(() => {
        setUserRole(localStorage.getItem('role'));
    }, [localStorage.getItem('role')])

    
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
      <div className='body'>
        {/* <Login/> */}
        {/* <Register/> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies" element={<MoviesPage/>} />
            <Route path="/movies/:id" element={<MovieDetails/>} />
            <Route path="/actors" element={<ActorsPage/>} />
            <Route path="/actors/:id" element={<ActorDetails/>} />
            <Route path="/addreview/:id" element={<CreateReview/>} />
            <Route path="/watchlist" element={<Watchlist/>} />
            <Route path="/reviews" element={<Reviews/>} />
            <Route path="/allreviews" element={<AllReviews/>} />
            <Route path="/user" element={<MyPage/>} />
            <Route path="/review/user/:userID" element={<UserPage/>} />
            <Route path="/genre/:id" element={<Genre/>}/>
          </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
