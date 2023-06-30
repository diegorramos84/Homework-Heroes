import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";

import LandingButton from '../../components/Landing Button/index'
import Title from '../../components/Title/index'

import './index.css';

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const serviceID = 'service_ek8nxis'
  const templateID = 'template_j70gr0a'
  const publicID = '6r-OzrK4AhXvKWeBH'

  emailjs.init(publicID)

  const sendEmail = (e) => {
    e.preventDefault(); 
  }

  let handleForm = (e) => {
    e.preventDefault(); 
    let templateParams = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value
    }

    setName(templateParams.name)
    setEmail(templateParams.email)
    setMessage(templateParams.message)

    
    emailjs.send(serviceID, templateID, templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      //Reset the states
      setName('')
      setEmail('')
      setMessage('')
      console.log(templateParams)
      toast.success('Message sent successfully');
      //reset templateParams 
      templateParams.name === '';
    }, function(error) {
      console.log('FAILED...', error);
      toast.error('Sorry there was an error sending message: ');
    });

  }

  console.log()

  console.log(name, email, message)

  return (
    <section className='contact-us-form'>
    <Title title='Contact Us'/>

    <form id='contactForm' name='form' onSubmit={sendEmail && handleForm}>
      <div className='inputs-container'>
        <div className='inputs padding'>
          <label htmlFor='name'>Name</label>
          <input id='name' name='name' className='landing-inputs' required />
        </div>
        <div className='inputs'>
          <label htmlFor='email'>Email</label>
          <input id='email' name='email' className='landing-inputs' required />
        </div>
      </div>
      <div className='message'>
        <label htmlFor='message'>Your Message</label>
        <textarea id='message' name='message' className='landing-inputs' required />
      </div>
      <div className='landing-page-btn'>
        <LandingButton name='SEND MESSAGE' type="submit" value="send" />
      </div>
    </form>

  </section>
  );
};

export default ContactForm;

