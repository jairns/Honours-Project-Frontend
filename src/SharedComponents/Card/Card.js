import React from 'react';
import './Card.css';

const Card = (props) => {
    return (
        <div className='card mt-30' style={{
            // Styles passed in via props
            maxWidth: `${props.width}`,
            height: `${props.height}`}}>
                {/* Card content */}
                {props.children}
        </div>
    );
}

export default Card;