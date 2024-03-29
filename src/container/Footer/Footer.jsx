import React from 'react'
import { motion } from 'framer-motion'
import { urlFor, client } from '../../client'
import { AppWrap, MotionWrap } from '../../wrapper'
import { useState, useEffect } from 'react'
import { Images } from '../.././constants'
import './footer.scss'
const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
  

  const { username, email, message } = formData

  const handleChangeInput = (e) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = () => {
        setLoading(true);
    const contact = {
      _type: 'contact',
      name: formData.username,
      email: formData.email,
      message: formData.message,
    }

    client
      .create(contact)
     .then(() => {
        setLoading(false);
        if(!contact){
          setIsFormSubmitted(true);
       }else   
       setIsFormSubmitted(false);
        })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <h2 className='head-text'>Take a coffee & chat with me</h2>

      <div className='app__footer-cards'>
        <div className='app__footer-card '>
          <img src={Images.email} alt='email' />
          <a href='mailto:sandyshelby29@gmail.com' className='p-text'>
            sandyshelby29@gmail.com
          </a>
        </div>
        <div className='app__footer-card'>
          <img src={Images.mobile} alt='phone' />
          <a href='tel:+91 9087256617' className='p-text'>
            9087256617
          </a>
        </div>
      </div>
      {!isFormSubmitted ? (
      
        <form className='app__footer-form app__flex'>
          <div className='app__flex'>
            <input
              className='p-text'
              type='text'
              placeholder='Your Name'
              id='username'
              value={username}
              onChange={handleChangeInput}
            required/>
          </div>
          <div className='app__flex'>
            <input
              className='p-text'
              type='email'
              placeholder='Your Email'
              id='email'
              value={email}
              onChange={handleChangeInput}
          required  />
          </div>
          <div>
            <textarea
              className='p-text'
              placeholder='Your Message'
              value={message}
              id='message'
              onChange={handleChangeInput}
           required />
          </div>
          <button type='submit' className='p-text' onClick={handleSubmit}>
          {!loading ? 'Send Message' : 'Sending...'}
          </button>
        </form>
    
      ) : (
        <div>
          <h3 className='head-text app__flex'>
            Thank you for getting in touch!
          </h3>
        </div>
      )}
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__primarybg'
)
