import {
    GET_CARDS,
    STUDY_CARDS,
    ADD_CARD,
    EDIT_CARD,
    UPDATE_CARD,
    DELETE_CARD,
    CLEAR_STUDYCARD,
    CLEAR_CARDS
} from '../Types';

const cardReducer = (state, action) => {
    switch(action.type) {
        // Clearing study card state
        case CLEAR_STUDYCARD:
            return {
                ...state,
                studyCard: null
            };
        // Getting the cards associated with a deck    
        case GET_CARDS:
            return {
                ...state,
                cards: action.payload,
                loaded: true
            };
        // Setting study card state
        case STUDY_CARDS:
            return {
                ...state,
                studyCard: action.payload,
                loaded: true
            };
        // Adding new card to state
        case ADD_CARD: 
            return {
                // Current state
                ...state,
                // Updating the state with the data sent from payload
                cards: [action.payload, ...state.cards],
                loading: false
            };
        // Clearing the cards
        case CLEAR_CARDS:
            return {
                ...state,
                cards: [],
                loaded: false
            };
        // Populating the state with the selected card
        case EDIT_CARD: 
            return {
                // Current state
                ...state,
                // Adding the card to state
                selectedCard: action.payload
            };
        // Updating a card
        case UPDATE_CARD:
            return {
                // Current state
                ...state,
                // Map through the cards to identify the card which is being updated, replace it with the new value
                cards: state.cards.map(card => 
                    card._id === action.payload._id ? 
                action.payload : card),
                loading: false
            };
        // Deleting a card
        case DELETE_CARD:
            return {
                // Current state
                ...state,
                // Retrieving all the cards except the one with the ID specified within the payload
                cards: state.cards.filter(card => card._id !== action.payload),
                loading: false
            };
        default: 
            return state;
    }
 }

 export default cardReducer;