import React, { useEffect, useState } from 'react'
import DescriptionColumn from './DescriptionColumn'
import ModalRightColumn from './ModalRightColumn'
function Uploader() {
    const [details, setDetails] = useState({
        title: '',
        description: '',
        category: '',
        modalSetting: '',
        license: 'Kalyke - Private Use (by default)',
        price: '0',
        modal: [],
        tags: [],
        images: []
    });
    useEffect(() => {
        const handleBeforeUnload = (event) => {
          const message = 'Do you want to close? Changes you made may not be saved.';
          event.returnValue = message; 
          return message; 
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, []);
    return (
        <div className='pb-[361px]  p-4 max-w-[1500px] mx-auto'>
            <h2 className='text-[30px] font-semibold'>Upload your design</h2>
            <div className=' gap-10 flex h-[100vh]'>
                <DescriptionColumn details={details} setDetails={setDetails} />
                <ModalRightColumn details={details} setDetails={setDetails} />
            </div>
        </div>
    )
}

export default Uploader
