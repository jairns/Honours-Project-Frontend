import React, { useReducer } from 'react';
import axios from 'axios';
import CardContext from './cardContext';
import cardReducer from './cardReducer';
import {
    GET_CARDS,
    STUDY_CARDS,
    ADD_CARD,
    EDIT_CARD,
    UPDATE_CARD,
    DELETE_CARD,
    CLEAR_CARDS,
    CLEAR_STUDYCARD
} from '../Types';

const CardState = props => {
    const initialState = {
        cards: [],
        selectedCard: null,
        studyCard: null,
        error: null,
        loaded: false
    };

    const [state, dispatch] = useReducer(cardReducer, initialState);

    // Get cards
    const getCards = async id => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL + `cards/${id}`);
            // Dispatching the function and the payload to the reducer
            dispatch({ 
                type: GET_CARDS, 
                // Response should be equal to all the users decks, which are sent in the payload
                payload: res.data 
            });
        } catch (err) {
            // Log error message if exists
            console.log(err.response)
        }
    }

    // Clearing the study card state
    const clearStudyCard = () => {
        dispatch({ type: CLEAR_STUDYCARD })
    }

    // Getting a study card
    const reviseCards = async id => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL + `cards/revise/${id}`);
            dispatch({ 
                type: STUDY_CARDS, 
                payload: res.data 
            });
        } catch (err) {
            console.log(err.response)
        }
    }

     // Adding a card
     const addCard = async card => {
        try {
            const res = await axios.post(process.env.REACT_APP_API_URL + 'cards', card);
            dispatch({ 
                type: ADD_CARD, 
                payload: res.data 
            });
        } catch (err) {
            console.log(err.response)
        }
    }

    // Edit Card
    const editCard = card => {
        dispatch({ type: EDIT_CARD, payload: card });
    }

    // Update Card
    const updateCard = async (id, cardData) => {
        try {
            const res = await axios.put(process.env.REACT_APP_API_URL + `cards/${id}`, cardData);
            dispatch({ 
                type: UPDATE_CARD, 
                payload: res.data
            });
        } catch (err) {
            console.log(err.response)
        }
    }

    // Updating cards status
    const updateStatus = async (cardData) => {
        try {
            await axios.put(process.env.REACT_APP_API_URL + `cards/${cardData._id}`, cardData);
        } catch (err) {
            console.log(err.response)
        }
    }

    // Deleting a card
    const deleteCard = async id => {
        try {
            await axios.delete(process.env.REACT_APP_API_URL + `cards/${id}`);
            // Dispatching the function and the payload to the reducer
            dispatch({ 
                type: DELETE_CARD, 
                payload: id
            });
        } catch (err) {
            console.log(err.response.data.msg)
        }
    }

    // Delete a file
    const deleteFile = async id => {
        try {
            const res = await axios.put(process.env.REACT_APP_API_URL + `cards/delete/file/${id}`);
            dispatch({ 
                type: UPDATE_CARD, 
                payload: res.data
            });
            } catch (err) {
                console.log(err.response)
            }
        }

    // Clearing the cards state
    const clearCards = () => {
        dispatch({ type: CLEAR_CARDS })
    }

    return (
        // Exports - applied to context, providing access to the state and functions throughout the entire application
        <CardContext.Provider value={{
            cards: state.cards,
            studyCard: state.studyCard,
            selectedCard: state.selectedCard,
            error: state.error,
            loaded: state.loaded,
            getCards,
            clearStudyCard,
            reviseCards,
            addCard,
            editCard,
            updateCard,
            updateStatus,
            deleteFile,
            deleteCard,
            clearCards
        }}>
            {props.children}
        </CardContext.Provider>
    );
};

export default CardState;