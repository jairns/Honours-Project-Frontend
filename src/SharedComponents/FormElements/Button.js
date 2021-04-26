import React from 'react';
import './FormElements.css';

const Button = (props) => {
    return (
        <button
            type={props.type} 
            className={props.class} 
            style={{ width: `${props.width}` }}
            name={props.name}
            onClick={props.click}>
                {props.value}
        </button>
    );
}

export default Button;