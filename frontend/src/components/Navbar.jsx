import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [userRole, setUserRole] = useState('');
    useEffect(() => {
        setUserRole(localStorage.getItem('role'));
    }, [localStorage.getItem('role')])

    return ( 
        <div className="navbar1">
            <div className="navbar-elements">
                <Link to={"/login"}><button className="btn-navbar">Login</button></Link>
                <Link to={"/register"}><button className="btn-navbar">Register</button></Link>
                <Link to={"/actors"}><button className="btn-navbar">Actors</button></Link>
                <Link to={"/movies"}><button className="btn-navbar">Movies</button></Link>
                {/* <Link to={"/genres"}><button className="btn-navbar">Genres</button></Link> */}
                {/* <Link to={"/allreviews"}><button className="btn-navbar">All reviews</button></Link> */}
                {/* <Link to={"/watchlist"}><button className="btn-navbar">My page(USER)</button></Link> */}
                {/* <Link to={"/reviews"}><button className="btn-navbar">My page(CRITIC)</button></Link> */}
                <Link to={"/user"}><button className="btn-navbar">My page</button></Link>
                {/* {userRole === 'USER' && (
                  <Link to={"/watchlist"}><button className="btn-navbar">My page</button></Link>
                )}
                {userRole === 'CRITIC' && (
                  <Link to={"/reviews"}><button className="btn-navbar">My page</button></Link>
                )} */}
            </div>
        </div>
     );
}
 
export default Navbar;