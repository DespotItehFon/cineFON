import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <div className="navbar1">
            <div className="navbar-elements">
                <Link to={"/login"}><button className="btn-navbar">Login</button></Link>
                <Link to={"/register"}><button className="btn-navbar">Register</button></Link>
                <Link to={"/actors"}><button className="btn-navbar">Actors</button></Link>
                <Link to={"/movies"}><button className="btn-navbar">Movies</button></Link>
                <Link to={"/genres"}><button className="btn-navbar">Genres</button></Link>
                {/* <Link to={"/addreview"}><button className="btn-navbar">Add review</button></Link> */}
            </div>
        </div>
     );
}
 
export default Navbar;