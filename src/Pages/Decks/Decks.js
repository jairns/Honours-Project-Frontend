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

    const authContext = useContext(AuthContext);
    const deckContext = useContext(DeckContext);
    const cardContext = useContext(CardContext);

    // Extracting the contacts & the filtered state within the context
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
    }, [])

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
            {decks && decks !== null && decks.length > 0 ? (
                <React.Fragment>
                    <Modal ref={modalRef} title={'Deck'} text={'deck'}/>
                    <h1 className='formHeading pt-110'>Your Decks</h1>
                    <div className='decks'>                       
                        {decks.map(deck => (
                            <Card width={props.windowWidth < 1100 ? '100%' : '43%'} height='auto' key={deck._id}> 
                                {deck.file === 'null' || !deck.file ? (
                                    <img src={Placeholder} alt='deck' />
                                    ) : (
                                        <img src={`http://localhost:5000/${deck.file}`} alt='deck' />
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
    )  
}
export default windowSize(Decks);
/*
Default thumbnail src:
https://www.pexels.com/photo/stacks-of-blank-white-visiting-cards-on-table-4466176/
*/