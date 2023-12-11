import React, { useRef } from 'react'
import SocialMediaRow from '../Common/SocialMediaRow'
import { faFacebook, faInstagram, faPinterest, faReddit, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
function ShareProfile({setIsShareBtnOpen}) {
    const socialMedia = [
        {
            icon: faTwitter,
            link: 'https://twitter.com/home'
        },
        {
            icon: faInstagram,
            link: 'https://www.instagram.com/abdul_is_a_designer/'
        },
        {
            icon: faReddit,
            link: 'https://www.reddit.com/'
        },
        {
            icon: faPinterest,
            link: 'https://www.pinterest.com/'
        },
        {
            icon: faTiktok,
            link: 'https://www.tiktok.com/explore'
        },
        {
            icon: faFacebook,
            link: 'https://www.facebook.com/campaign/landing.php?campaign_id=1653377901&extra_1=s%7Cc%7C358050429110%7Ce%7Cfacebook%27%7C&placement=&creative=358050429110&keyword=facebook%27&partner_id=googlesem&extra_2=campaignid%3D1653377901%26adgroupid%3D65139789042%26matchtype%3De%26network%3Dg%26source%3Dnotmobile%26search_or_content%3Ds%26device%3Dc%26devicemodel%3D%26adposition%3D%26target%3D%26targetid%3Dkwd-362360550869%26loc_physical_ms%3D1011080%26loc_interest_ms%3D%26feeditemid%3D%26param1%3D%26param2%3D&gclid=CjwKCAiAjfyqBhAsEiwA-UdzJPZwL1HyVoSc9CN-x56x5LRHHze1M8qZ8NBaq5nDVHABp1y45lcjUhoC1GEQAvD_BwE'
        }
    ]

    const { user_id } = useParams()
  const profileShareRef = useRef(user_id);
  const copyToClipboard = () => {
    if (profileShareRef.current) {
        profileShareRef.current.value = `${frontendUrl}/user/${user_id}`;
        profileShareRef.current.select();
        document.execCommand('copy');
        toast.success('Copied to clipboard');
        profileShareRef.current.value = '';
        setIsShareBtnOpen(false)
    }
};


    return (
        <ul className='absolute top-[24px] shadow-md flex flex-col gap-1 right-[0] bg-white px-1'>
            <textarea
          ref={profileShareRef}
          readOnly
          style={{ position: 'absolute', left: '-9999px' }}
        />
            {socialMedia.map(item => {
            return <SocialMediaRow  copyToClipboard={copyToClipboard} item={item} key={`social-media-user-share ${item.link} ${Math.random() * Date.now()}`}/>
            })}
        </ul>
    )
}

export default ShareProfile
