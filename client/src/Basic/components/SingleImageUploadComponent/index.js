import React from 'react';
import { EMPTY_PROFILE_IMAGE, IMAGE_ICON } from '../../../icons';
import { getImageUrlPath } from '../../../Constants';

const SingleImageFileUploadComponent = ({ imageFile, disabled, setWebCam, editProfileImage = true }) => {
    const imageFormatter = () => {
        if (imageFile) {
            if (imageFile instanceof File) {
                return URL.createObjectURL(imageFile)
            } else {
                return getImageUrlPath(imageFile)
            }
        }
        return null
    }
    const imageWidth = "125px"
    const imageHeight = "125px";
    return (
        <div className='flex gap-1 flex-col items-center'>
            <div>
                {Boolean(imageFile) ?
                    <img className='rounded' style={{ height: imageHeight, width: imageWidth, objectFit: 'cover' }}
                        src={imageFormatter()}
                        alt=''
                    />
                    :
                    <EMPTY_PROFILE_IMAGE height={imageHeight} width={imageWidth} />
                }
            </div>
            {
                (editProfileImage && (!disabled)) ?
                    <div className=''>
                        <button type='button' className="text-sm  border
                         bg-blue-800 p-1 rounded text-white" disabled={disabled} onClick={() => { setWebCam(true) }} htmlFor="profileImage" >{IMAGE_ICON} </button>
                    </div>
                    :
                    ""
            }
        </div>
    );
};

export default SingleImageFileUploadComponent;