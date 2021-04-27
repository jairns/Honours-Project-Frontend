import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Input from '../../SharedComponents/FormElements/Input';
import Button from '../../SharedComponents/FormElements/Button';
import Spinner from '../../SharedComponents/Spinner/Spinner';
import FilePreview from '../../SharedComponents/FormElements/FilePreview';
import '../../SharedComponents/FormElements/FormElements.css';
import AuthContext from '../../Context/Auth/authContext';
import CardContext from '../../Context/Cards/cardContext';
import DeckContext from '../../Context/Decks/deckContext';

const EditCard = (props) => {

    // Extracting card id from query parameter
    let id = props.match.params.id;

    // Required context
    const authContext = useContext(AuthContext);
    const deckContext = useContext(DeckContext);
    const cardContext = useContext(CardContext);

    // Extracting functions from the context
    const { loadUser } = authContext;
    const { getCards, updateCard, deleteFile } = cardContext;
    const { getDecks, decks } = deckContext;

    // Card values
    const [card, setCard] = useState({
        deck: '',
        question: '',
        answerText: '',
        file: '',
    });

    // Loading state
    const [loaded, setLoaded] = useState(false);

    // Setting file from within the card throws an error as the path has not yet been create, thus the includes function cannot function
    const [file, setFile] = useState('');
    const [filePrev, setFilePrev] = useState(false); 

    // Response messages
    const [deckValid, setDeckValid] = useState(true);
    const [questionValid, setQuestionValid] = useState(true);
    const [AnswerTextValid, setAnswerTextValid] = useState(true);
    const [fileValid, setFileValid] = useState(true);
    
    // Input type
    const [type, setType] = useState('text');

    // When the page renders
    useEffect(() => {
        // Call the load user function
        loadUser();
        getDecks();
        const getCard = async () => {
            const res = await axios.get(process.env.REACT_APP_API_URL + `cards/card/${id}`);
            // Updating the card with the HTTP response
            setCard({
                question: res.data.question,
                answerText: res.data.answerText,
                file: res.data.file,
                deck: res.data.deck
            });
            setLoaded(true);
        }
        getCard();
     // eslint-disable-next-line
    }, [])

    const onDeckChange = e => {
        // Getting the value and converting to string as its original value is an array
        const value = [...e.target.selectedOptions].map(opt => opt.value).join();
        setCard({
            ...card,
            deck: value
        });
        setDeckValid(true); 
    }

    const deleteFileHandler = () => {
        // Remove the file
        deleteFile(id);
        // Hide the file preview component
        setFilePrev(true);
    }

    const handleSubmit = e => {
        // Prevent the form submitting
        e.preventDefault();
        // If the deck is invalid - display an error message 
        if(card.deck === '' || card.deck === 'false') {
            setDeckValid(false);
        } else {
            setDeckValid(true);
        }
        // If the deck is valid
        if(deckValid && card.deck !== 'false' && questionValid && AnswerTextValid && fileValid) {
            // Initialise the form data 
            let cardData = new FormData();
            // Append the card to the form data
            cardData.append('answerText', card.answerText);
            cardData.append('question', card.question);
            cardData.append('deck', card.deck);
            cardData.append('file', file);
            // Call the update card function from the card state
            updateCard(id, cardData);
            // Prepare for redirect
            getCards(card.deck);
            // Redirect to the view cards page
            props.history.push(`/viewcards/${card.deck}`);
        }
    }

    return (
        <div>
            {/* If the data has loaded */}
            {loaded ? (
                <form className='margins' onSubmit={handleSubmit}>
                    <h1 className='formHeading pt-110'>Edit Card</h1>

                    {/* Populate the select statement with the decks available */}
                    <select name='decks' onChange={onDeckChange} value={card.deck}>
                        <option value='false'>SELECT A DECK</option>
                        {/* Map through the decks */}
                        {decks.map(deck => (
                            <option value={deck._id}>{deck.title}</option>
                        ))}
                    </select>
                    {/* Error message */}
                    {!deckValid &&  <p className='errorMsg red'>Invalid deck.</p>}

                    <Input 
                        type='text' 
                        placeholder='FRONT OF CARD(QUESTION)' 
                        value={card.question}
                        name='question'
                        // Update the value on change
                        onChange={e => {
                            setCard({
                                ...card,
                                question: e.target.value
                            })
                            // Validation on change
                            if(e.target.value !== '') {
                                setQuestionValid(true);
                            } else {
                                setQuestionValid(false); 
                            }
                        }} />
                    {!questionValid && <p className='errorMsg red'>A question is required.</p>}

                    <Input 
                        type='text' 
                        placeholder='BACK OF CARD(ANSWER)' 
                        value={card.answerText} 
                        name='answerText'
                        onChange={e => {
                            setCard({
                                ...card,
                                answerText: e.target.value
                            })
                            if(e.target.value !== '') {
                                setAnswerTextValid(true);
                            } else {
                                setAnswerTextValid(false); 
                            }
                        }} />
                    {!AnswerTextValid  && <p className='errorMsg red'>An answer in text is required.</p>}

                    {/* If the user has a file for the card */}
                    {card.file && card.file !== '' && card.file !== 'null' && !filePrev && (
                        // Display the file preview component
                        <FilePreview 
                            label='File' 
                            // Pass the file in
                            file={process.env.REACT_APP_FILE_URL + `${card.file}`} 
                            // Determine whether it is an image or audio
                            type={card.file.includes('audio') ? 'audio' : 'image'}
                            onClick={deleteFileHandler} />
                    )}

                    <Input 
                        type={type} 
                        placeholder='ADD AUDIO OR IMAGE TO ANSWER' 
                        focus={() => setType('file')}
                        // Regex for file validation
                        onChange={e => {setFile(e.target.files[0])
                            if((/\.(jpe?g|png|m4a|mp3|mp4)$/i).test(e.target.value)) {
                                setFileValid(true)
                            } else {
                                setFileValid(false)
                            }
                        }} />
                    {!fileValid && 
                        <p className='errorMsg red'>File is invalid. Please upload jpeg, jpg png for an image, or m4a, mp4, mp3 for audio.</p>
                    }

                    <Button type='submit' class={'green mt-50'} value='EDIT CARD' width='100%' />
                </form>
            ) : (
                <Spinner />
            )}
        </div>
    );
}

export default EditCard;