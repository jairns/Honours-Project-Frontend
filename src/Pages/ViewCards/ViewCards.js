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

    const id = props.match.params.id;

    const authContext = useContext(AuthContext)
    const cardContext = useContext(CardContext)

    const { getCards, cards, editCard, loaded } = cardContext;

    // When the page renders
    useEffect(() => {
        // Call the load user function
        authContext.loadUser();
        getCards(id)

        //eslint-disable-next-line
    }, [])

    const modalRef = React.useRef();

    // If no decks exist
    if(cards.length === 0 && loaded) {
        return (
            <div className='margins formHeading pt-110' style={{
                height: '70vh'
            }}>
                <h3>No cards yet. Please create some!</h3>
            </div>
        )
    }
    return (
        <div className='margins'>
            {cards !== null && loaded ? (
                <React.Fragment>
                    <Modal ref={modalRef} title={'Card'} text={'card'}/>
                    <h1 className='formHeading pt-110'>Your Cards</h1>
                    <div className='decks'>
                        {cards.map(card => (
                            <Card width={props.windowWidth < 1100 ? '100%' : '43%'} height='auto' key={card._id}>      
                                {card.file && card.file !== 'null' && card.file.includes('image') ? 
                                (
                                    <img src={`http://localhost:5000/${card.file}`} alt='Card file' />
                                ) : (
                                    <img src={Placeholder} alt='deck' /> 
                                )}
                                <h2>{card.title}</h2>
                                <p>{card.question}</p>
                                <div className='controls'>
                                    <Link to={`/editcard/${card._id}`}><p className="blue no-underline ffStyles">EDIT CARD</p></Link>
                                    <p onClick={() => {
                                        modalRef.current.openModal();
                                        editCard(card);
                                    }}  className="red ffStyles">DELETE CARD</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </React.Fragment>
            ) : (<Spinner />)}
        </div>
    );   
}

export default windowSize(ViewCards);
/*
NPM package:
https://www.npmjs.com/package/react-window-size
Default thumbnail src:
https://www.pexels.com/photo/stacks-of-blank-white-visiting-cards-on-table-4466176/
*/