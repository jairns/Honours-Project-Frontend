import React from 'react';
import './Section.css';

const Section = (props) => {
    return (
        <section>
            <div className='margins'>
                <img src={props.img} alt={props.heading} className='icons' />
                <h1 className='formHeading'>{props.heading}</h1>
                <p>{props.sectionText}</p>
            </div>
        </section>
    )
}

export default Section;