import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn, setIsAdmin }) => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setIsLoggedIn(false)
  }, []);

  const login = () => {
    axios
      .post("http://localhost:8080/api/v1/auth/authenticate", {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        setIsLoggedIn(true);
        setIsAdmin(response.data.role==="ADMIN")
        navigate(`/movies`);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  console.log(localStorage.getItem("userID"));
  return (
    <div className="login-form">
      <div className="form-group">
        <label style={{ color: "white" }}>Username </label>
        <input
          type="text"
          className="form-control"
          placeholder="User Name"
          id="username"
          style={{ width: "260px", marginLeft: "20px", margin: "10px" }}
        />
      </div>
      <div className="form-group">
        <label style={{ color: "white" }}>Password </label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          id="password"
          style={{ width: "260px", marginLeft: "20px", margin: "10px" }}
        />
      </div>
      <div className="btn-container">
        <button
          type="submit"
          className="btn-login"
          id="login"
          onClick={() => login()}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
