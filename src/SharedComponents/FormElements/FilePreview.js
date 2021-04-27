import React from 'react';

const FilePreview = (props) => {
    return (
        <form className='imagePrevForm'>
            <label htmlFor='imgPreview' className='d-block'>Current {props.label}:</label>
            {/* If the file is an image */}
            {props.type === 'image' ? (
                <img src={props.file} className='imagePrev' alt='current file' />
            ) : (
                /* If the file is an image */
                <audio controls className='audioPrev'>
                    <source src={props.file} />
                </audio>
            )}

            {/* Remove the file */}
            <div className='removeContainer' onClick={props.onClick}>
                <i className='fa fa-trash red binIcon'></i>
                <p className='red removeText'>Remove {props.label}</p>
            </div>
        </form>
    );
} 

export default FilePreview;