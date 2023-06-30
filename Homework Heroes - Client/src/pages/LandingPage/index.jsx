import LandingButton from '../../components/Landing Button/index'

import Study from '../../assets/images/childrenStudyLogo.png'
import Children from '../../assets/images/childrenLogo.png'

import homework from '../../assets/icons/homework.png'
import homeworkChecked from '../../assets/icons/homeworkChecked.png'
import studentHomework from '../../assets/icons/studentHomework.png'

import MainTitle from '../../components/MainTitle/index'
import Title from '../../components/Title/index'

import ContactForm from '../../components/ContactForm/index'

import {Link} from 'react-router-dom'
import './index.css'

import {useSelector } from "react-redux";

function LandingPage() {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo)

  return (
    <>
    <div className='landing-container'>
      <section className='header-section-left'>
        <MainTitle mainTitle='Homework Heroes'/>
        <p role='mainParagraph'>
          Home-Work Hero is a specialised app designed to support autistic students in managing and completing homework assignments effectively. With Home-Work Hero, teachers can easily assign tasks, provide clear instructions, and track progress, while students gain structure, organisation, and independence in their homework routines.
        </p>

        {userInfo === null ?(
          <Link to='/register'><LandingButton className='landing-btn' name='GET STARTED'/></Link>) : 
        (
          <Link to='/profile'><LandingButton className='landing-btn' name='GET STARTED'/></Link>
        )}


      </section>
      <section className='header-section-right'>
        <img role='mainImage' src={Study} alt='Children Studying' />
      </section>
    </div>

    <main className='main-landing-container'>
      <section className='how-it-works-container'>
        <Title title='How It Works'/>
        <div className='flex-section'>
          <div className='card'>
            <img src={homework} alt='icon' />
            <h4 className='light-pink-text'>Homework</h4>
            <p>Teachers give students their assigned homework</p>
          </div>
          <div className='card'>
            <img src={studentHomework} alt='icon' />
            <h4 className='light-pink-text'>View Homework</h4>
            <p>Students view their homework on our portal</p>
          </div>
          <div className='card'>
            <img src={homeworkChecked} alt='icon' />
            <h4 className='light-pink-text'>Feedback</h4>
            <p>Teachers give students their well deserved feedback</p>
          </div>
        </div>
      </section>


      <section className='designed-by-us-container'>
        <Title title='Designed by us, for them'/>
        <div className='studying-icon'>
          <img src={Children} alt='Children' />
        </div>
        <div className='flex-section'>
          <div className='card'>
            <h4>Scientific Research</h4>
            <p>We used scientific research to enable our choices</p>
          </div>
          <div className='card'>
            <h4>Simplistic Design</h4>
            <p>Our design is simplistic and based on science</p>
          </div>
          <div className='card'>
            <h4>Customisable Design</h4>
            <p>Customisable to yours and your child's needs</p>
          </div>
        </div>
      </section>


    <ContactForm />
    </main>

    </>
  )
}

export default LandingPage
