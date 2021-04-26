import React from 'react';
import './FormElements.css';

const TextInput = (props) => {

    return (
        <input 
            type={props.type} 
            placeholder={props.placeholder} 
            onFocus={props.focus} 
            name={props.name} 
            onChange={props.onChange}
            value={props.value} />
    );
}

export default TextInput;