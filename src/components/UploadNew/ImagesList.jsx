import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function ImagesList({ selectedFile, fileUploadProgress, removeImageHandler }) {

    return (
        <>
            {selectedFile.length > 5 && <span className='text-[#ff0000] flex'>Maximum limit is only 6 files per upload</span>}
            <ul className='pt-4 max-h-[130px] overflow-y-auto'>
                {selectedFile.map((item, index) => {
                    return (
                        <li key={`ImagesList ${index * Math.random() * Date.now()}`} className='flex justify-between items-center'><span className='flex gap-2 items-center'>
                            <FontAwesomeIcon icon={faFile} />
                            <span>{item.name}</span> <span className='text-[12px]'>{fileUploadProgress ? "uploading" : null}</span>
                        </span>
                            <button onClick={() => removeImageHandler(index)}><FontAwesomeIcon icon={faTrashCan} /></button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default ImagesList
