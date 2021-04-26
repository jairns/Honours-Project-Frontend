import React from 'react';
import CoverImage from '../../Components/CoverImage/CoverImage';
import Section from '../../Components/Section/Section';
import Target from '../../Images/target.svg';
import Method from '../../Images/solution.svg';
import Start from '../../Images/start.svg';

const Landing = () => {
    return (
        <div>
            <CoverImage 
                heading={'Welcome to omnilingu'}
                text={'An online learning environment which allows users to create flashcards.'} />
            <Section 
                img={Target} 
                alt={'Our Aim'} 
                heading={'Our Aim'} 
                sectionText={'To provide an accessible learning enviornment where language learners can advance their language skills by using a certified learning method.'} />
            <Section 
                img={Method} 
                alt={'Our Method'} 
                heading={'Our Method'} 
                sectionText={'We use spaced repeition, partnered with flashcards. This means, you decide determine the time between repetitions, the harder the question, the shorter the repetition.'} />
            <Section 
                img={Start} 
                alt={'Get Started'} 
                heading={'Get Started'} 
                sectionText={'To get started login or register with us, its free!'} />    
        </div>        
    );
}

export default Landing;