import React from 'react'

function DropZone({ handleFileChange }) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = {target: {files: [e.dataTransfer.files?.[0]]}};
    handleFileChange(files);
  };
  return (
    <>
      <div onDragOver={handleDragOver}
        onDrop={handleDrop} className="flex items-center mt-3 justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-[80px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <p className=" text-sm text-gray-500 dark:text-gray-400 font-semibold">Click to upload or Drag and drop</p>
          </div>
          <input id="dropzone-file" type="file" name="file" onChange={handleFileChange} className="hidden" />
        </label>
      </div>
    </>
  )
}

export default DropZone
