import React from 'react';
import './Card.css';

const Card = (props) => {
    return (
        <div className='card mt-30' style={{
            maxWidth: `${props.width}`,
            height: `${props.height}`}}>
                {props.children}
        </div>
    )
}

export default Card;