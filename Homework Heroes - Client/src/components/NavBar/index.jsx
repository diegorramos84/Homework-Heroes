import {useContext } from "react"
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../slice/userAPISlice'
import { logout } from '../../slice/authSlice'

import {CgProfile} from 'react-icons/cg'
import { SiHomeadvisor } from "react-icons/si";

import {AiOutlineLogin, AiOutlineLogout} from 'react-icons/ai'
import {SiGnuprivacyguard} from 'react-icons/si'
import {GrDashboard} from 'react-icons/gr'




import boyStudy from '../../assets/images/boyStudy.png'
import {BurgerNavContext} from '../../context/BurgerNavigation/burgerNavContext'
import './index.css'
const styles = ({ isActive }) => ({ color: isActive ? '#000000' : '#929292' });
const specialStyle = {color: '#929292'}

function NavBar(props) {

  const BurgerNavClick = useContext(BurgerNavContext);
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      <header>
        <div className='icon'>
          <img src={boyStudy} alt='icon' />
        </div>
        {!userInfo ? (
          <>
            <nav role='navigation' className='main-nav'>
              <NavLink role='links' style={styles} to='/'>   <SiHomeadvisor /> Home </NavLink>
              <NavLink role='links' style={styles} to='/login'> <AiOutlineLogin/> Login </NavLink>
              <NavLink role='links' style={styles} to='/register'> <SiGnuprivacyguard/> Register </NavLink>
            </nav>


            <div onClick={BurgerNavClick.BurgerNavClick} className='burger-nav'>
              <div className='burger-line'></div>
              <div className='burger-line'></div>
              <div className='burger-line'></div>
            </div>
            <div className={`burger-nav-items ${BurgerNavClick.isOpen && 'active'}`}>
                <NavLink role='links' onClick={BurgerNavClick.BurgerNavClick} style={styles} to='/'><SiHomeadvisor /> Home </NavLink>
                <NavLink role='links' onClick={BurgerNavClick.BurgerNavClick} style={styles} to='/login'> <AiOutlineLogin/> Login </NavLink>
                <NavLink role='links' onClick={BurgerNavClick.BurgerNavClick} style={styles} to='/register'><SiGnuprivacyguard/> Register </NavLink>
            </div>
          </>
        ) : (
          <>
          <nav role='navigation' className='main-nav'>
              <NavLink style={styles} to='/'><SiHomeadvisor /> Home </NavLink>
              <NavLink style={styles} to='/profile'> <CgProfile /> {userInfo.name} Profile</NavLink>
              <NavLink style={styles} to='/homework'><GrDashboard/> Dashboard </NavLink>
              <NavLink  style={specialStyle} onClick={logoutHandler}><AiOutlineLogout/> Logout  </NavLink>
              <NavLink to='/profile'><img src={userInfo.avatar} alt= 'superhero' className='navbar-avatar' /></NavLink>

            </nav>
                <div onClick={BurgerNavClick.BurgerNavClick} className='burger-nav'>
                  <div className='burger-line'></div>
                  <div className='burger-line'></div>
                  <div className='burger-line'></div>
              </div>
            <div className={`burger-nav-items ${BurgerNavClick.isOpen && 'active'}`}>
              <NavLink to='/profile'><img src={userInfo.avatar} alt= 'superhero' className='navbar-avatar' /></NavLink>
              <NavLink role='links' onClick={BurgerNavClick.BurgerNavClick} style={styles} to='/'><SiHomeadvisor /> Home </NavLink>
              <NavLink role='links' onClick={BurgerNavClick.BurgerNavClick} style={styles} to='/profile/'><CgProfile /> {userInfo.name} Profile</NavLink>
              <NavLink role='links' onClick={BurgerNavClick.BurgerNavClick} style={styles} to='/homework'> <GrDashboard/> Dashboard </NavLink>
              <NavLink role='links' onClick={BurgerNavClick.BurgerNavClick && logoutHandler } style={specialStyle}> <AiOutlineLogout/> Logout  </NavLink>
            </div>
          </>
        )
      }
      </header>
      <Outlet />
    </>
  )
}
export default NavBar
