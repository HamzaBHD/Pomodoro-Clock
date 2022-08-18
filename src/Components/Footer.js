import React from 'react';
import './Footer.css'

export default function Footer() {
    return (
        <div className='footer'>
            <span className='text--footer'>by Hamza ELBOHDIDI ©</span>
            <span className='social'>
              <a href='https://www.facebook.com/HMZ.Bouhdidi/'
              target='_blank'>
              <i className='bi bi-facebook icons'></i>
              </a>
              <a href='https://www.instagram.com/__hamzabh/?hl=en'
              target='_blank'>
              <i className='bi bi-instagram icons'></i>
              </a>
              <a href='https://github.com/HamzaBHD'
              target='_blank'>
              <i className='bi bi-github icons'></i>
              </a>
            </span>
        </div>
    )
}