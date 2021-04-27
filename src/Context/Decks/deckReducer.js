import {
    GET_DECKS,
    GET_DECK,
    ADD_DECK,
    DELETE_DECK,
    EDIT_DECK,
    UPDATE_DECK,
    CLEAR_DECKS
} from '../Types';

const deckReducer = (state, action) => {
    switch(action.type) {
        // Setting decks associated with a user
        case GET_DECKS:
            return {
                ...state,
                decks: action.payload,
                loaded: true
            }
        // Setting a specific deck
        case GET_DECK:
            return {
                ...state,
                current: action.payload,
                loaded: true
            }
        // Adding a new deck to state
        case ADD_DECK: 
            return {
                ...state,
                // Updating the state with the data sent from payload
                decks: [action.payload, ...state.decks],
                loading: false
            }
        // Populating the state with the selected deck
        case EDIT_DECK: 
            return {
                // Current state
                ...state,
                // Set current to the deck
                current: action.payload
            }
        // Updating a deck
        case UPDATE_DECK:
            return {
                // Current state
                ...state,
                // Map through the decks to identify the deck which is being updated, replace it with the new value
                decks: state.decks.map(deck => 
                    deck._id === action.payload._id ? 
                action.payload : deck),
                loading: false
            }
        // Deleting deck from state
        case DELETE_DECK:
            return {
                // Current state
                ...state,
                // Retrieving all the decks except the one with the ID specified withing the payload
                decks: state.decks.filter(deck => deck._id !== action.payload),
                loading: false
            }
        // Clearing decks from state
        case CLEAR_DECKS:
            return {
                ...state,
                decks: null,
                error: null,
                selectedDeck: null
            }
        default: 
            return state;
    }
 }

 export default deckReducer;