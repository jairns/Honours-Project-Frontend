import React, { useReducer } from 'react';
import axios from 'axios';
import DeckContext from './deckContext';
import deckReducer from './deckReducer';
import {
    GET_DECKS,
    GET_DECK,
    ADD_DECK,
    DELETE_DECK,
    EDIT_DECK,
    UPDATE_DECK,
    CLEAR_DECKS
} from '../Types';

const DeckState = props => {
    const initialState = {
        decks: null,
        // When editing a deck, this will be updated to the decks values
        current: null,
        // Error
        error: null,
        loaded: false
    };

    const [state, dispatch] = useReducer(deckReducer, initialState);

    // Get decks
    const getDecks = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL + 'decks');
            // Dispatching the function and the payload to the reducer
            dispatch({ 
                type: GET_DECKS, 
                // Response should be equal to all the users decks, which are sent in the payload
                payload: res.data 
            });
        } catch (err) {
            console.log(err.response)
        }
    }

    // Get deck
    const getDeck = async id => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL + `decks/${id}`);
            // Dispatching the function and the payload to the reducer
            dispatch({ 
                type: GET_DECK, 
                // Response should be equal to all the users decksw, which are sent in the payload
                payload: res.data 
            });
        } catch (err) {
            console.log(err.response)
        }
    }

    // Add deck
    const addDeck = async deck => {
        try {
            const res = await axios.post(process.env.REACT_APP_API_URL + 'decks', deck);
            // Dispatching the function and the payload to the reducer
            dispatch({ 
                type: ADD_DECK, 
                payload: res.data 
            });
        } catch (err) {
            console.log(err.response)
        }
    }
    // Edit deck
    const editDeck = deck => {
        // Dispatching the function and the payload to the reducer
        dispatch({ type: EDIT_DECK, payload: deck });
    }
    // Update deck
    const updateDeck = async (id, deckData) => {
        try {
            const res = await axios.put(process.env.REACT_APP_API_URL + `decks/${id}`, deckData);
            // Dispatching the function and the payload to the reducer
            dispatch({ 
                type: UPDATE_DECK, 
                payload: res.data
            });
            // console.log(id, deckData)
        } catch (err) {
            console.log(err.response)
        }
    }
    // Delete deck
    const deleteDeck = async id => {
        try {
            await axios.delete(process.env.REACT_APP_API_URL + `decks/${id}`);
            // Dispatching the function and the payload to the reducer
            dispatch({ 
                type: DELETE_DECK, 
                payload: id
            });
            } catch (err) {
                console.log(err.response)
            }
    }
    // Delete thumbnail
    const deleteThumbnail = async id => {
        try {
           const res = await axios.put(process.env.REACT_APP_API_URL + `decks/delete/thumbnail/${id}`);
            dispatch({ 
                type: UPDATE_DECK, 
                payload: res.data
            });
        } catch (err) {
            console.log(err.response)
        }
    }

    // Clear decks
    const clearDecks = () => {
        // Dispatching the function and the payload to the reducer
        dispatch({ type: CLEAR_DECKS });
    }

    return (
        <DeckContext.Provider value={{
            decks: state.decks,
            current: state.current,
            error: state.error,
            getDecks,
            getDeck,
            addDeck,
            editDeck,
            updateDeck,
            deleteDeck,
            deleteThumbnail,
            clearDecks
        }}>
            {props.children}
        </DeckContext.Provider>
    );
};

export default DeckState;