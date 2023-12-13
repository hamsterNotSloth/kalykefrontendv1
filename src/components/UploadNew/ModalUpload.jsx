import React from 'react'
import ImagesList from './ImagesList'
import DropZone from '../Common/DropZone'

function ModalUpload({details, setDetails, isUploadLoading, selectedFiles, uploadFileHandler,setSelectedFile, setFileUploadProgress, fileUploadProgress, handleFileChange}) {


  const removeImageHandler = (id) => {
    const imageExist = selectedFiles.filter((item, index) => index !== id)
    setSelectedFile(imageExist)
  }
  return (
    <div>
      <span className='font-medium text-[18px] mt-8 block'>Upload model files</span>
      <DropZone handleFileChange={handleFileChange} />
      <label>Accepted formats: stl, obj, 3ds, scad, gcode, 3mf, blend, sldprt, sldasm, amf, dae, eps, f3d, fcstd, mtl, pdf, ply, skp, step, dxf, dwg, svg, txt, bmp, ai, x3d, psd, zip.</label>
      {selectedFiles.length > 0 && <ImagesList fileUploadProgress={fileUploadProgress} removeImageHandler={removeImageHandler} selectedFile={selectedFiles} /> }
    </div>
  )
}

export default ModalUpload
