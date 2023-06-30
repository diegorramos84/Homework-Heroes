import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slice/userAPISlice";
import { setCredentials } from "../../slice/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingButton from "../../components/Landing Button";
import "../LoginPage/index.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/homework");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/homework");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  
  return (
    <>
    <div className="container">
      <form className="login-register-form" id="login" onSubmit={handleSubmit}>
      <div className='inputsContainer'>
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="username landing-inputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="password landing-inputs"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        <LandingButton className='landing-btn' role="login-btn" name='LOGIN'/>
        <p role="account">
          Dont have an account?<NavLink to="/register">Register</NavLink>
        </p>
      </form>
    </div>
    </>
  );
};
export default LoginPage;
