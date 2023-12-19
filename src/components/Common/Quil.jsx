import React, { useEffect } from 'react'
import ReactQuill from 'react-quill'
import { toast } from 'react-toastify';

function Quill({ descriptionHandler, style, description }) {
  const modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline'], ['link'], [{ 'list': 'bullet' }],
      ],
    },
  };

  const formats = ['bold', 'italic', 'underline', 'link', 'list', 'bullet'];
  return (
    <>
      <ReactQuill
        theme="snow"
        value={description}
        modules={modules}
        formats={formats}
        style={{ backgroundColor: `${style}` }}
        readOnly={description.length >= 250}
        onChange={(value) => descriptionHandler(value)}
      />
    </>
  )
}

export default Quill
