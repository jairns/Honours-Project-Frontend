import React from 'react';
import './FormElements.css';

const ImageUpload = (props) => {

    return (
        <input 
            type='file'
            placeholder={props.placeholder} 
            onFocus={props.focus} 
            name={props.name} 
            onChange={props.onChange}
            value={props.value}
            accept='.jpg,.png,.jpeg' />
    );
}

export default ImageUpload;