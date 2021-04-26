import React, { useState, useEffect, useContext } from 'react';
import windowSize from 'react-window-size';
import ReactCardFlip from 'react-card-flip';
import './ReviseCards.css';
import Button from '../../SharedComponents/FormElements/Button';
import Card from '../../SharedComponents/Card/Card';
import Spinner from '../../SharedComponents/Spinner/Spinner';
import AuthContext from '../../Context/Auth/authContext';
import CardContext from '../../Context/Cards/cardContext';

const Cards = (props) => {

    const id = props.match.params.id;

    const authContext = useContext(AuthContext)
    const cardContext = useContext(CardContext)

    const { 
        loaded, 
        cards, 
        getCards,
        reviseCards, 
        updateStatus, 
        studyCard, 
        clearStudyCard } = cardContext;

    // When the page renders
    useEffect(() => {
        // Call the load user function
        authContext.loadUser();
        // Clearing current study card within state
        clearStudyCard();
        // Getting the cards within this deck
        getCards(id)
        // Getting a card to revise from the specified deck
        reviseCards(id)
        // eslint-disable-next-line
    }, [])

    // For flipping the card
    const [isFlipped, setIsFlipped] = useState(false);

    const onClickHandler = (id, status) => {
        // Updating status of card
        const card = { 
            ...studyCard,
            status: status
        }
        // Calling function which sends the put request
        updateStatus(card)
        // Clearing the current study card within the state
        clearStudyCard();
        // Flipping the card
        setIsFlipped(!isFlipped)
        // Timeout is required to ensure the cards are up to date
        setTimeout(() => {
            // Getting the new study card
            reviseCards(id);
            // Delaying by 0.05 seconds
        }, 50)
    }

    // Checking whether any cards are available
    if(cards.length === 0 && loaded) {
        return (
            <div className='margins formHeading pt-110' style={{
                height: '70vh'
            }}>
                {/* If no cards exist, display the following message */}
                <h3>No cards to revise. Please create some!</h3>
            </div>
        )
    }
    return (
        <div className='margins'>
            {/* If study card is not null and loaded is true */}
            {studyCard !== null && loaded ? (
                <React.Fragment>
                    <h1 className='formHeading pt-110'>Revise</h1>
                    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                        <Card width={'100%'} height={props.windowWidth < 768 ? '500px' : '425px'}>
                            <h2>Question:</h2>
                            <p>{studyCard.question}</p>
                            <div className='btn-front'>
                                <Button 
                                    type='button' 
                                    class={'green'}
                                    value='TURN CARD' 
                                    width={props.windowWidth < 1100 ? '100%' : '100%'} 
                                    click={() => setIsFlipped(!isFlipped)}
                                />
                            </div>
                        </Card>
                        <Card width={'100%'} height={props.windowWidth < 768 ? '500px' : '425px'}>
                            <h2>Answer:</h2>
                            <p>{studyCard.answerText}</p> 
                            <div className='fileContainer'>
                                {/*If file is audio  */}
                                {studyCard.file && studyCard.file !== 'null' && studyCard.file.includes('audio') &&  (
                                    <audio controls className='audio'>
                                        <source src={process.env.REACT_APP_FILE_URL + `${studyCard.file}`} />
                                    </audio>
                                )}
                                {/*If file is an image  */}
                                {studyCard.file && studyCard.file !== 'null' && studyCard.file.includes('image') &&  (
                                    <img src={process.env.REACT_APP_FILE_URL + `${studyCard.file}`} alt='bread' className='cardImg' /> 
                                )}
                            </div>
                            <div className='feedback bottom'>
                                <Button 
                                    type='submit' 
                                    class={'green mt-30'} 
                                    value='EASY' 
                                    name='easy'
                                    width={props.windowWidth < 1100 ? '100%' : '33%'}
                                    click={() => onClickHandler(studyCard.deck, 'easy')} />
                                <Button 
                                    type='submit' 
                                    class={'medium mt-30'} 
                                    value='MEDIUM'
                                    name='medium' 
                                    width={props.windowWidth < 1100 ? '100%' : '33%'}
                                    click={() => onClickHandler(studyCard.deck, 'medium')} />
                                <Button 
                                    type='submit' 
                                    class={'hard mt-30'} 
                                    value='HARD' 
                                    name='hard'
                                    width={props.windowWidth < 1100 ? '100%' : '33%'}
                                    click={() => onClickHandler(studyCard.deck, 'hard')} />
                            </div>
                        </Card>
                    </ReactCardFlip>
                </React.Fragment>
            ) : (
                <Spinner />
            )}
            </div>
        );
}

export default windowSize(Cards);