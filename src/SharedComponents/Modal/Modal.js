import React, { useState, forwardRef, useContext } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../Context/Auth/authContext';
import DeckContext from '../../Context/Decks/deckContext';
import CardContext from '../../Context/Cards/cardContext';
import './Modal.css';

const Modal = forwardRef((props, ref) => {

    // Modal open state
    const [isClick, setIsClicked] = useState(false);

    const authContext = useContext(AuthContext);
    const deckContext = useContext(DeckContext);
    const cardContext = useContext(CardContext);

    // Extracting the contacts & the filtered state within the context
    const { user, deleteUser } = authContext;
    const { current, deleteDeck } = deckContext;
    const { selectedCard, deleteCard } = cardContext;

    const history = useHistory();

    React.useImperativeHandle(ref, () => {
        return {
          openModal: () => open(),
          close: () => close()
        }
      });

    const open = () => {
        setIsClicked(true);
    }

    const close = () => {
        setIsClicked(false);
    }

    const onDeleteHandler = e => {
        // Preventing form submission
        e.preventDefault();
        // Deck deletion
        if(props.title === 'Deck') {
            // Getting deck id from currents state
            let id = current._id;
            // Passing deck id to the delete deck function
            deleteDeck(id)
            // Closing the modal
            setIsClicked(false);
            // Card deletion
        } else if(props.title === 'Card') {
            let id = selectedCard._id;
            deleteCard(id)
            setIsClicked(false);
            // Account deletion
        } else {
            deleteUser(user._id)
            setIsClicked(false);
            // Redirect to login page
            history.push('/login');
        }
    }

    // If isClick is true, open modal
    if(isClick){
        return ReactDOM.createPortal(
            <div className='modal-wrapper'>
                <div className="modal-content">
                    <div className="modal-body">
                        <h4>Delete {props.title}<i className="fa fa-trash pl-5"></i></h4>
                        <p>Are you sure you want to delete {props.text}?</p>
                    </div>
                    <div className="modal-footer">
                        <p onClick={() => setIsClicked(!isClick)}>CANCEL</p>
                        <form>
                            <button onClick={onDeleteHandler} className='modal-btn' type="submit">DELETE</button>
                        </form>
                    </div>
                </div>
            </div>, document.getElementById("modal-root")
            // ^^ Modal location on page
         );   
    } else {
        return null;
    }
});

export default Modal;