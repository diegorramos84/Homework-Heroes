import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useUpdateUserMutation } from "../../slice/userAPISlice";
import { setCredentials } from "../../slice/authSlice";
import "react-toastify/dist/ReactToastify.css";
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
import './index.css'
const UserProfile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedSuperhero, setSelectedSuperhero] = useState(null);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  const [updateProfile] = useUpdateUserMutation();
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setSelectedSuperhero(userInfo.avatar);
  }, [userInfo.id,userInfo.email, userInfo.name, userInfo.avatar]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({ id: userInfo.id, data:{
          id: userInfo.id,
          name:userInfo.name,
          email:email,
          avatar:selectedSuperhero,
          password:password,
}
        }).unwrap().then((payload) => {
          console.log( payload);
        return payload;
        })
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  const handleSuperheroClick = (superhero) => {
    setSelectedSuperhero(superhero);
  };
  return (
    <> 
      <ToastContainer/>
      <form
        className="login-register-form"
        id="register"
        onSubmit={submitHandler}
      >
        <div className='inputsContainer'>
          <h1>Profile</h1>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="name"
            name="name"
            value={name}
            // onChange={(e) => setName(e.target.value)}
            readOnly
            disabled
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="level">Level</label>
          <input
            type="text"
            className="number"
            name="level"
            value={userInfo.level}
            readOnly
            disabled
          />
          <label htmlFor="school">School</label>
          <input
            type="text"
            className="school"
            name="school"
            value={userInfo.school}
            readOnly
            disabled
          />
          <label htmlFor="school_class">Class</label>
          <input
            type="text"
            className="school_class"
            name="school_class"
            value={userInfo.school_class}
            disabled
            readOnly
          />
        

        <label htmlFor="avatar">Update your superhero character:</label>
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

          <LandingButton className='landing-btn' role="update-btn" name='UPDATE'/>
          </div>
      </form>
    </>
  );
};
export default UserProfile;
