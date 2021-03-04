import React from 'react';
import '../../styles/UploadImage.css';

const UploadImage = (props) => {

    return (
        <div className="mb-6 flex " >
            <div className="w-1/3 flex-initial mt-2 mb-2">
                <label
                    htmlFor="add-image"
                    className="object-right flex-end bg-white text-green-400 hover:bg-green-400 hover:text-white border-2 border-green-400  py-1 px-2 ml-6 rounded-full focus:outline-none focus:shadow-outline"
                >Screenshot</label>
                <input
                    id="add-image"
                    type="file"
                    accept="image/*"
                    multiple={false}
                    className="add-image "
                    onChange={props.handleChangeImage}
                />
            </div>
            <div className="w-1/2 flex-initial mt-2 mb-2">
                <label
                    className="read-only"
                >{(props.imagePath) ? <span>{props.imagePath}</span> : ""} </label>
            </div>
        </div>
    )
};

export default UploadImage;