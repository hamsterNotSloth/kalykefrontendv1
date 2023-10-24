import React, { useState } from 'react'
import UploaderStepOne from './UploaderStepOne'
import UploaderHeader from './UploaderHeader'
import UploaderStepTwo from './UploaderStepTwo';
import UploaderStepThree from './UploaderStepThree';

function UploaderPopUp({ setSignUpModalStatus }) {
  const [selectedFile, setSelectedFile] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1)
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white max-w-[400px] w-[100%] min-h-[500px] p-8 rounded-lg shadow-lg relative">
                <UploaderHeader currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} setSignUpModalStatus={setSignUpModalStatus} />
                {currentLevel == 1? <UploaderStepOne setCurrentLevel={setCurrentLevel} setSelectedFile={setSelectedFile} selectedFile={selectedFile}  /> : null}
                {currentLevel == 2? <UploaderStepTwo setCurrentLevel={setCurrentLevel}/> : null}
                {currentLevel == 3? <UploaderStepThree /> : null}
            </div>
        </div>
    )
}

export default UploaderPopUp
