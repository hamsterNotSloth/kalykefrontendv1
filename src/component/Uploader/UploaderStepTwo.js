import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductDetails } from '../../redux/slices/productSlice';

function UploaderStepTwo({ setCurrentLevel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState({
    title: '',
    description: '',
  });

  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.product);

  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1' }, { 'header': '2' }],
        ['bold', 'italic', 'underline', 'list'],
      ],
    },
  };

  const formats = ['bold', 'italic', 'underline', 'list'];

  const productDescriptionHandler = () => {
    setIsLoading(true)
    dispatch(updateProductDetails({ ...productDetails, title: details.title, description: details.description}));
    if(details.title.length > 0 && details.description.length > 0){
      setCurrentLevel("3");
    }
    setIsLoading(false)
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="title"
          className="w-[100%] px-2 h-[40px] border-[2px] border-[#c1b9b9] rounded-sm"
          onChange={(e) => setDetails({ ...details, title: e.target.value })}
        />
      </div>
      <div>
        <ReactQuill
          theme="snow"
          value={details.description}
          modules={modules}
          formats={formats}
          onChange={(value) => setDetails({ ...details, description: value })}
        />
      </div>
      <button
        disabled={isLoading}
        onClick={productDescriptionHandler}
        className="bg-blue-500 mt-3 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {isLoading ? 'Processing...' : 'Next'}
      </button>
    </div>
  );
}

export default UploaderStepTwo;
