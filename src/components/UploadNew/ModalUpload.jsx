import React, { useState } from 'react'
import DropZone from './DropZone'
import ImagesList from './ImagesList'
import { useDispatch } from 'react-redux'
import { useGetMyProfileQuery } from '../../redux/apiCalls/apiSlice'
import { getToken } from '../../Token/token'
import { toast } from 'react-toastify'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../config/config'

function ModalUpload({details, setDetails, isUploadLoading, selectedFiles, uploadFileHandler,setSelectedFile, setFileUploadProgress, fileUploadProgress, handleFileChange}) {


  const removeImageHandler = (id) => {
    const imageExist = selectedFiles.filter((item, index) => index !== id)
    setSelectedFile(imageExist)
  }
  return (
    <div>
      <span className='font-medium text-[18px] block mt-3'>Upload model files</span>
      <DropZone handleFileChange={handleFileChange} />
      <label>Accepted formats: stl, obj, 3ds, scad, gcode, 3mf, blend, sldprt, sldasm, amf, dae, eps, f3d, fcstd, mtl, pdf, ply, skp, step, dxf, dwg, svg, txt, bmp, ai, x3d, psd, zip.</label>
      {selectedFiles.length > 0 && <ImagesList fileUploadProgress={fileUploadProgress} removeImageHandler={removeImageHandler} selectedFile={selectedFiles} /> }
    </div>
  )
}

export default ModalUpload
