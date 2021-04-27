import React, { useContext, useEffect } from 'react';
import  { Link } from 'react-router-dom';
import windowSize from 'react-window-size';
import './Decks.css';
import Card from '../../SharedComponents/Card/Card';
import Placeholder from '../../Images/flashcards.jpeg';
import Modal from '../../SharedComponents/Modal/Modal';
import Spinner from '../../SharedComponents/Spinner/Spinner';
import AuthContext from '../../Context/Auth/authContext';
import DeckContext from '../../Context/Decks/deckContext';
import CardContext from '../../Context/Cards/cardContext';

const Decks = (props) => {

    // Context
    const authContext = useContext(AuthContext);
    const deckContext = useContext(DeckContext);
    const cardContext = useContext(CardContext);

    // Extracting the decks & the filtered state within the context
    const { decks, getDecks, editDeck } = deckContext;
    const { clearCards } = cardContext;
    
    // When the page renders
    useEffect(() => {
        // Call the load user function
        authContext.loadUser();   
        clearCards();
        // Getting the decks associated with the user
        getDecks();
        //eslint-disable-next-line
    }, []);

    // Modal reference
    const modalRef = React.useRef();

    // // If no decks exist
    if(decks !== null && decks.length === 0) {
        return (
            <div className='margins formHeading pt-110' style={{
                height: '70vh'
            }}>
                <h3>No decks yet. Please create some!</h3>
            </div>
        )
    }

    return (
        <div className='margins'>
            {/* Display the decks if any exist */}
            {decks && decks !== null && decks.length > 0 ? (
                <React.Fragment>
                    <Modal ref={modalRef} title={'Deck'} text={'deck'}/>
                    <h1 className='formHeading pt-110'>Your Decks</h1>
                    <div className='decks'>     
                        {/* Map through the decks, outputing each */}
                        {decks.map(deck => (
                            <Card width={props.windowWidth < 1100 ? '100%' : '43%'} height='auto' key={deck._id}> 
                                {/* If no file exists */}
                                {deck.file === 'null' || !deck.file ? (
                                    // Display placeholder text
                                    <img src={Placeholder} alt='deck' />
                                    ) : (
                                        // Otherwise, display the user's image
                                        <img src={process.env.REACT_APP_FILE_URL + `${deck.file}`} alt='deck' />
                                    )
                                }
                                <h2>{deck.title}</h2>
                                <p>{deck.description}</p>
                                <div className='controls'> 
                                    <Link to={`/cards/${deck._id}`}><p className='greenText'>REVISE</p></Link>
                                    <p>
                                        <Link to={`/editdeck/${deck._id}`} className="blue">EDIT DECK</Link>
                                    </p>
                                    <p>
                                        <Link 
                                            className='blue' 
                                            to={`/viewcards/${deck._id}`}>
                                                VIEW CARDS
                                        </Link>
                                    </p>
                                    {/* Calling the openModal function from the modal component */}
                                    <p onClick={() => {
                                        modalRef.current.openModal();
                                        editDeck(deck);
                                    }} className="red">DELETE DECK</p>
                                </div> 
                            </Card>
                        ))}
                    </div> 
                </React.Fragment> 
            ) : <Spinner /> }
        </div>
    ); 
}

export default windowSize(Decks);