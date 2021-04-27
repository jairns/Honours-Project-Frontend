import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import windowSize from 'react-window-size';
import '../Decks/Decks.css';
import Card from '../../SharedComponents/Card/Card';
import Placeholder from '../../Images/flashcards.jpeg';
import Modal from '../../SharedComponents/Modal/Modal';
import Spinner from '../../SharedComponents/Spinner/Spinner';
import AuthContext from '../../Context/Auth/authContext';
import CardContext from '../../Context/Cards/cardContext';

const ViewCards = (props) => {

    // Extract from query param
    const id = props.match.params.id;

    // Initialise context
    const authContext = useContext(AuthContext);
    const cardContext = useContext(CardContext);

    // Extract required functions from context
    const { getCards, cards, editCard, loaded } = cardContext;

    // When the page renders
    useEffect(() => {
        // Call the load user function
        authContext.loadUser();
        getCards(id)
        //eslint-disable-next-line
    }, []);

    // For modal
    const modalRef = React.useRef();

    // If no decks exist
    if(cards.length === 0 && loaded) {
        return (
            <div className='margins formHeading pt-110' style={{
                height: '70vh'
            }}>
                <h3>No cards yet. Please create some!</h3>
            </div>
        );
    }
    return (
        <div className='margins'>
            {cards !== null && loaded ? (
                <React.Fragment>
                    <Modal ref={modalRef} title={'Card'} text={'card'}/>
                    <h1 className='formHeading pt-110'>Your Cards</h1>
                    <div className='decks'>
                        {/* Map through the cards */}
                        {cards.map(card => (
                            <Card width={props.windowWidth < 1100 ? '100%' : '43%'} height='auto' key={card._id}>      
                                {/* If the file has an image */}
                                {card.file && card.file !== 'null' && card.file.includes('image') ? 
                                (
                                    <img src={process.env.REACT_APP_FILE_URL + `${card.file}`} alt='Card file' />
                                ) : (
                                    // If the file does not have an image
                                    <img src={Placeholder} alt='deck' /> 
                                )}
                                <h2>{card.title}</h2>
                                <p>{card.question}</p>
                                <div className='controls'>
                                    <Link to={`/editcard/${card._id}`}><p className="blue no-underline ffStyles">EDIT CARD</p></Link>
                                    <p onClick={() => {
                                        // Open the modal
                                        modalRef.current.openModal();
                                        // Place the card in state
                                        editCard(card);
                                    }}  className="red ffStyles">DELETE CARD</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </React.Fragment>
            ) : <Spinner /> }
        </div>
    );   
}

export default windowSize(ViewCards);