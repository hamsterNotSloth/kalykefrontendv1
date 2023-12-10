import React, { useEffect, useState } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialMedia } from './socialMedia';
import SocialMediaRow from '../Common/SocialMediaRow';

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
          <FontAwesomeIcon className='text-[#e91313]' icon={faHeart} /> Support kalyke
        </a>
      </div>
      <div>
        <ul className='flex gap-3 w-[400px] justify-end items-center'>
          {socialMedia.map((item) => (
            <SocialMediaRow key={`social-media-footer-${item.link}`} item={item} />
          ))}
        </ul>
      </div>
      <div>
        <ul className='flex max-w-[480px] justify-end gap-3'>
          <li><a href="https://docs.google.com/document/d/1BG0-q_IAsCRgQESYfQLj0s1G1U1oc_9WqqEJ9u2x4io/edit#heading=h.2zqx1nsy4bnz" target="_blank" rel="noopener noreferrer">Terms & Conditions</a> </li>
          <li><a href="https://docs.google.com/document/d/1UQBPOvqJ_KXDEzCHSWEnrBwChgSD0LH9K0esPNWxqIA/edit#heading=h.76n0dgv3l9rh" target="_blank" rel="noopener noreferrer">Support</a></li>
          <li><a href='https://docs.google.com/forms/d/e/1FAIpQLSeciR5hznseDBhkWU-9FoSO-uHNGI-PQFNfr8f_vB0veidoDA/viewform' target='_blank' rel="noopener noreferrer"> Feedback</a></li>
          <li><a href='https://docs.google.com/forms/d/e/1FAIpQLSesf_brU7bdInDirULcFfUCE0TQXZXuPxGHwFuEaZ04iIZkwg/viewform?usp=send_form' target='_blank' rel="noopener noreferrer">Report Model</a></li>
          <li><a href="https://docs.google.com/document/d/1AglNGgsYiWLAwvxb9EyNe5YOL5iq0uuoBX7yDtBX9g8/edit#heading=h.eu4l1l5fdd7h" target="_blank" rel="noopener noreferrer">Privacy</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
