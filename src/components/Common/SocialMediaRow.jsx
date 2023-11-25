import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function SocialMediaRow({item, copyToClipboard}) {
    return (
        <li ><a href={item.link} onClick={copyToClipboard} target='_blank'>
            <FontAwesomeIcon icon={item.icon} />
        </a></li>
    )
}

export default SocialMediaRow
