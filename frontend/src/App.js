import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import MoviesPage from './components/MoviesPage';
import ActorsPage from './components/ActorsPage';

function App() {
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
            <Route path="/actors" element={<ActorsPage/>} />
          </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
