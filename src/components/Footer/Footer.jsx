import React, { useEffect, useState } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialMedia } from './socialMedia';
import SocialMediaRow from '../Common/SocialMediaRow';
import { Link } from 'react-router-dom';

function Footer() {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = 100;

      setIsFixed(scrollY > triggerPoint);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`bg-white p-3 px-6 flex justify-between border-t-[1px] rounded-t-lg mx-5 shadow-md items-center h-[50px] ${isFixed ? 'fixed bottom-0 left-0 right-0 z-50' : ''}`}>
      <div>
        <a
          href='https://ko-fi.com/kalyke'
          className='bg-[#29abe0] text-white px-2 py-1 rounded-sm flex items-center justify-center gap-2'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon className='text-[#e91313]' icon={faHeart} /> Support Kalyke
        </a>
      </div>
      <div>
        <ul className='flex gap-3 w-[400px] justify-end items-center'>
          {socialMedia.map((item) => (
            <li key={`social-media-footer-${Math.random()}`}><a href={item.link} target='_blank'>
              <FontAwesomeIcon icon={item.icon} />
            </a></li>
          ))}
        </ul>
      </div>
      <div>
        <ul className='flex max-w-[480px] justify-end gap-3'>
          <li><Link to="/T&C">Terms & Conditions</Link> </li>
          <li><Link to="/support">Support</Link></li>
          <li><a href='https://docs.google.com/forms/d/e/1FAIpQLSeciR5hznseDBhkWU-9FoSO-uHNGI-PQFNfr8f_vB0veidoDA/viewform' target='_blank' rel="noopener noreferrer"> Feedback</a></li>
          <li><a href='https://docs.google.com/forms/d/e/1FAIpQLSesf_brU7bdInDirULcFfUCE0TQXZXuPxGHwFuEaZ04iIZkwg/viewform?usp=send_form' target='_blank' rel="noopener noreferrer">Report Model</a></li>
          <li><Link to="/privacypolicy">Privacy</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
