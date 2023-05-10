import axios from 'axios';

const Register = () => {
    const register = () => {
        axios
          .post('http://localhost:8080/api/v1/auth/register', {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            email: document.getElementById("email").value,
            firstname: document.getElementById("firstname").value,
            lastname: document.getElementById("lastname").value,
            role: document.getElementById('role').value
          })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      };
    return ( 
            <div className="register-form">    
                <div className="form-group">
                    <label style={{color: "white"}}>Username </label>
                    <input type="text" className="form-control" placeholder="Username" id="username"  style={{width: "260px", marginLeft: "20px", margin: "10px"}}/>
                </div>
                <div className="form-group">
                    <label style={{color: "white"}}>Password </label>
                    <input type="password" className="form-control" placeholder="Password" id="password" style={{width: "260px", marginLeft: "20px", margin: "10px"}}/>
                </div>
                <div className="form-group">
                    <label style={{color: "white"}}>Email </label>
                    <input type="text" className="form-control" placeholder="Email" id="email" style={{width: "260px", marginLeft: "20px", margin: "10px"}}/>
                </div>
                <div className="form-group">
                    <label style={{color: "white"}}>First name </label>
                    <input type="text" className="form-control" placeholder="First Name" id="firstname" style={{width: "260px", marginLeft: "20px", margin: "10px"}}/>
                </div>
                <div className="form-group">
                    <label style={{color: "white"}}>Last name </label>
                    <input type="text" className="form-control" placeholder="Last name" id="lastname" style={{width: "260px", marginLeft: "20px", margin: "10px"}}/>
                </div>
                <label style={{color: "white", paddingRight: "40px"}}>Select Role:</label>
                <select id="role" name="role">
                    <option value="USER">Regular User</option>
                    <option value="CRITIC">Movie Critic</option>
                </select>
                <div className="btn-container">
                    <button type="submit" className="btn-login" id="register" onClick={() => register()}>Register</button>
                </div>
                

            </div>
     );
}
 
export default Register;