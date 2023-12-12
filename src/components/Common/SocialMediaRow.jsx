import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function SocialMediaRow({item, copyToClipboard}) {
    const handleClick = () => {
        window.open(item.link, '_blank', 'width=600,height=400');
        copyToClipboard(); 
      };
    return (
        <li ><a href={item.link} onClick={handleClick} target='_blank'>
            <FontAwesomeIcon icon={item.icon} />
        </a></li>
    )
}

export default SocialMediaRow
