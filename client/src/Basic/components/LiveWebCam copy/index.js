import React, { useRef, useCallback, useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import Webcam from 'react-webcam';
import { DeleteButton } from '../../../Buttons';
import { getImageUrlPath } from '../../../Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const videoConstraints = {
    width: 250,
    height: 250,
    facingMode: 'user',
};

const LiveWebCam = ({ picture, setPicture, onClose }) => {
    const [failure, setFailure] = useState(false);
    const [loading, setLoading] = useState(!picture);

    const handleUserMedia = () => {
        setLoading(false);
    };

    const webcamRef = useRef(null);
    const capture = useCallback(() => {
        const pictureSrc = webcamRef.current.getScreenshot();
        setPicture(pictureSrc);
    });

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    return (
        <div className='flex flex-col  w-full h-full'>
            <div className='flex w-full place-items-start gap-2 flex-col'>
                <div className='flex justify-center flex-col  items-center w-[10vw] h-[18vh] mt-1'>
                    {picture === '' || picture === null
                        ?
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            onUserMedia={handleUserMedia}
                            onUserMediaError={() => { setLoading(false); setFailure(true); }}
                            className=''
                        />
                        : (
                            picture instanceof File
                                ? <img id="productImageView" src={URL.createObjectURL(picture)} alt={"employee"} className='h-40 w-32 py-1 rounded ' />
                                : <img src={getImageUrlPath(picture)} alt={"employee"} className='rounded h-32 w-30 mt-2' />
                        )
                    }
                </div>
                <div className='flex  gap-2 items-center justify-center m-4 ml-8'>
                    <button
                        type='button'
                        onClick={() => { onClose(); }}
                        className="border h-6 w-6 text-[15px] bg-red-500 text-white px-1 rounded hover:bg-red-600"
                    >
                        x
                    </button>
                    <div className='flex items-center border  w-auto'>
                        <input type="file" name="" id="profileImage" className='hidden' onChange={(e) => { setPicture(e.target.files[0]); }} />
                        <label htmlFor="profileImage" className="p-1 rounded text-[14px] text-white border bg-sky-500">
                            <FontAwesomeIcon icon={faFileCsv} />
                        </label>
                    </div>
                    <button type='button'
                        hidden={failure}
                        onClick={(e) => { e.preventDefault(); capture(); }}
                        className={`border p-1 rounded text-[12px]`}
                    >
                        Capture
                    </button>
                    <div className='border'>
                        <button type='button' className='border h-6 w-6 text-[15px] bg-red-500 text-white rounded hover:bg-red-600' onClick={() => setPicture(null)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveWebCam;
