import React from 'react';
import './Spinner.css';
import { BeatLoader } from 'react-spinners';

const Spinner = () => {
    return(
        <div className='spinnerContainer'>
            <BeatLoader loading />
        </div>
    );
}

export default Spinner;