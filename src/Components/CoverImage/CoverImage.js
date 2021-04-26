import React from 'react';
import './CoverImage.css';

const CoverImage = (props) => {
    return (
        <div className='coverImage'>
            <div className='margins vertical'>
                <h1 className='formHeading'>{props.heading}</h1>
                <p>{props.text}</p>
            </div>
        </div>
    );
}

export default CoverImage;