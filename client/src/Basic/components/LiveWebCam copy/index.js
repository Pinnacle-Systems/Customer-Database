import React, { useRef, useCallback, useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner';
import Webcam from 'react-webcam'
import { DeleteButton } from '../../../Buttons';
import { getImageUrlPath } from '../../../Constants';
const videoConstraints = {
    width: 250,
    height: 250,
    facingMode: 'user',
}
const LiveWebCam = ({ picture, setPicture, onClose }) => {
    const [failure, setFailure] = useState(false);
    const [loading, setLoading] = useState(!picture);
    const handleUserMedia = () => {
        setLoading(false);
    };
    const webcamRef = useRef(null)
    const capture = useCallback(() => {
        const pictureSrc = webcamRef.current.getScreenshot()
        setPicture(pictureSrc)
    })
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });


    return (
        <div className='flex flex-col gap-2  '>
            <div className='h-60 flex flex-col justify-between items-center'>
                <>{loading ?
                    <>
                        <div className='flex justify-center text-blue-900'><ThreeCircles color='light-yellow' /></div>
                    </> :
                    <h2 className="text-center border rounded text-gray-900 text-[14px] bg-gray-200 p-1">
                        profile
                    </h2>}
                </>

                <div className='flex justify-center flex-col'>
                    {/* {failure
                        &&
                        <p className='text-center bg-red-700 text-white flex justify-center'>Check Your Webcam</p>

                    } */}

                    {picture === '' || picture === null
                        ?
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            onUserMedia={handleUserMedia}
                            onUserMediaError={() => { setLoading(false); setFailure(true); }}
                        />
                        : (<>
                            {(picture instanceof File)
                                ?
                                <img id="productImageView" src={URL.createObjectURL(picture)} alt={"employee"} className='h-44 w-44 py-1 rounded border' />
                                :
                                <img src={getImageUrlPath(picture)} alt={"employee"} className=' rounded border  h-44    w-44' />
                            }
                        </>
                        )
                    }
                </div>
                <div className='flex justify-between gap-2 item-center '>
                    <button type='button'
                        onClick={() => {
                            onClose()
                        }}
                        className="border h-6 w-5 text-[15px] bg-red-500 text-white  px-1 rounded hover:bg-red-600"
                    >
                        x
                    </button>

                    <div className='flex items-center border  h-6 w-auto'>
                        <input type="file" name="" id="profileImage" className='hidden' onChange={(e) => { setPicture(e.target.files[0]) }} />
                        <label htmlFor="profileImage" className="p-1  rounded text-[12px] text-white border bg-sky-500"> Browse</label>
                    </div>
                    <button
                        hidden={failure}
                        onClick={(e) => {
                            e.preventDefault()
                            capture()
                        }}
                        className={`border p-1 rounded text-[12px]`}
                    >
                        Capture
                    </button>
                    <div className='border '>
                        {<DeleteButton onClick={() => { setPicture(null) }} />}
                    </div>
                </div>
            </div>
        </div >
    )
}
export default LiveWebCam