import React, { useState } from 'react'
import ModalUploadStage from './ModalUploadStage'
import UploaderHeader from './UploaderHeader'
import ModalDetailsUploadStage from './ModalDetailsUploadStage';
import ModalConfirmUploadStage from './ModalConfirmUploadStage';

function UploaderPopUp({ setSignUpModalStatus }) {
  const [selectedFile, setSelectedFile] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1);
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white max-w-[400px] w-[100%] min-h-[500px] max-h-[700px] overflow-y-auto p-8 rounded-lg shadow-lg relative">
                <UploaderHeader currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} setSignUpModalStatus={setSignUpModalStatus} />
                {currentLevel == 1? <ModalUploadStage setCurrentLevel={setCurrentLevel} setSelectedFile={setSelectedFile} selectedFile={selectedFile}  /> : null}
                {currentLevel == 2? <ModalDetailsUploadStage setCurrentLevel={setCurrentLevel}/> : null}
                {currentLevel == 3? <ModalConfirmUploadStage /> : null}
            </div>
        </div>
    )
}

export default UploaderPopUp
