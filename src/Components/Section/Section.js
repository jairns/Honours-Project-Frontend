import React from 'react';
import './Section.css';

const Section = (props) => {
    return (
        <section>
            <div className='margins'>
                {/* Props passed in from the landing page to generate a section */}
                <img src={props.img} alt={props.heading} className='icons' />
                <h1 className='formHeading'>{props.heading}</h1>
                <p>{props.sectionText}</p>
            </div>
        </section>
    )
}

export default Section;