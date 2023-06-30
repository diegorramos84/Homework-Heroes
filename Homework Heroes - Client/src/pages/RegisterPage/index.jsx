import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import { useRegisterMutation } from "../../slice/userAPISlice";
// import { setCredentials } from "../../slice/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../RegisterPage/index.css";
import superhero1 from "../../assets/images/superhero1.png";
import superhero2 from "../../assets/images/superhero2.png";
import superhero3 from "../../assets/images/superhero3.png";
import superhero4 from "../../assets/images/superhero4.png";
import superhero5 from "../../assets/images/superhero5.png";
import superhero6 from "../../assets/images/superhero6.png";
import superhero7 from "../../assets/images/superhero7.png";
import superhero8 from "../../assets/images/superhero8.png";
import LandingButton from "../../components/Landing Button";

const superheroImages = [
  superhero1,
  superhero2,
  superhero3,
  superhero4,
  superhero5,
  superhero6,
  superhero7,
  superhero8,
];
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school_class: "",
    school:"",
    superpower:"",
    date_of_birth: "",
    level:"0",
    password: "",
    role: "",
    // avatar:"selectedSuperhero"
  });
  const [selectedSuperhero, setSelectedSuperhero] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);
  const { name, email,school, school_class,  superpower, date_of_birth, level, password, role } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSuperheroClick = (superhero) => {
    setSelectedSuperhero(superhero);
    setFormData({ ...formData, avatar: superhero });
  };
console.log(formData);
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!selectedSuperhero) {
    toast.error('Please select a superhero.');
    return;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
  } else {
    try {
      await register(formData).unwrap();
      toast.success("Registration successful");
      navigate("/login"); // Redirect to the login page
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }
};


  return (
    <>
      <form className="login-register-form" id="register" onSubmit={handleSubmit}>
        <div className="inputsContainer">
        <h1>Register</h1>
        <label htmlFor="name" role="studentName">Student Name</label>
        <input
          type="text"
          className="name landing-inputs"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
        <label htmlFor="password" role="password">Password</label>
        <input
          type="password"
          className="password landing-inputs"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <label htmlFor="password2" role="password2">Confirm Password</label>
        <input
          type="password"
          className="confirmPassword landing-inputs"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <label htmlFor="superpower">Superpower</label>
        <input
          type="text"
          className="superpower landing-inputs"
          placeholder="Do you have superpowers (Yes or No)"
          name="superpower"
          value={superpower}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="email landing-inputs"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
         <label htmlFor="date_of_birth">Date of Birth</label>
      <input
        type="date"
        className="dob landing-inputs"
        name="date_of_birth"
        value={date_of_birth}
        onChange={handleChange}
        required
        />
         <label htmlFor="level">Level</label>
      <input
        type="text"
        className="number landing-inputs"
        name="level"
        value={level}
        onChange={handleChange}
        readOnly
        disabled
       />
        <label htmlFor="role">Role</label>
        <input
          type="text"
          placeholder="Student or Teacher"
          className="role landing-inputs"
          name="role"
          value={role}
          onChange={handleChange}
          required
        />
        <label htmlFor="school">School</label>
        <input
          type="text"
          className="school landing-inputs"
          name="school"
          value={school}
          onChange={handleChange}
          required
        />
        <label htmlFor="school_class">Class</label>
        <input
          type="text"
          className="school_class landing-inputs"
          name="school_class"
          value={school_class}
          onChange={handleChange}
          required
        />

        <label htmlFor="avatar" role ="fav-superhero">Select your superhero character:</label>
        <div className="superhero-container">
          {superheroImages.map((superhero, index) => (
            <img
              src={superhero}
              alt={`superhero${index + 1}`}
              onClick={() => handleSuperheroClick(superhero)}
              className={`superhero-image ${
                selectedSuperhero === superhero ? "selected" : ""
              }`}
              key={index}
            />
          ))}
        </div>
        </div>
        
        <LandingButton className='landing-btn' role="register-btn" name='REGISTER'/>
        <p>
          Have an account already?<NavLink to="/login">Login</NavLink>
        </p>
      </form>
    </>
  );
};
export default RegisterPage
