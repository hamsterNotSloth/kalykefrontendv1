import React from 'react'
import ReactQuill from 'react-quill'

function Quill({descriptionHandler, description}) {
    const modules = {
        toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'list'],
          ],
        },
      };
    
      const formats = ['bold', 'italic', 'underline', 'list'];
  return (
        <ReactQuill
          theme="snow"
          value={description}
          modules={modules}
          formats={formats}
          onChange={(value) => descriptionHandler(value)}
        />
  )
}

export default Quill