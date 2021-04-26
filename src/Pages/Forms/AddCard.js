import React, { useState, useEffect, useContext } from 'react';
import Input from '../../SharedComponents/FormElements/Input';
import Button from '../../SharedComponents/FormElements/Button';
import '../../SharedComponents/FormElements/FormElements.css';
import AuthContext from '../../Context/Auth/authContext';
import DeckContext from '../../Context/Decks/deckContext';
import CardContext from '../../Context/Cards/cardContext';
import Spinner from '../../SharedComponents/Spinner/Spinner';

const AddCard = () => {

    const authContext = useContext(AuthContext)
    const deckContext = useContext(DeckContext)
    const cardContext = useContext(CardContext)

    const { getDecks, decks, loaded } = deckContext;
    const { addCard } = cardContext;

    // When the page renders
    useEffect(() => {
        // Call the load user function
        authContext.loadUser();
        getDecks();
        //eslint-disable-next-line
    }, [])

    // Values
    const [question, setQuestion] = useState('');
    const [deck, setDeck] = useState('');
    const [answerText, setAnswerText] = useState('');
    const [file, setFile] = useState();
    const [type, setType] = useState('text');

    // Response messages
    const [sucMsg, setSucMsg] = useState(false);
    const [deckValid, setDeckValid] = useState(true);
    const [questionValid, setQuestionValid] = useState(true);
    const [AnswerTextValid, setAnswerTextValid] = useState(true);
    const [fileValid, setFileValid] = useState(true);

    const onDeckChange = e => {
        // Getting the value and converting to string as its original value is an array
        const value = [...e.target.selectedOptions].map(opt => opt.value).join();
        setDeck(value);
        if(deck !== 'false') {
            setDeckValid(true); 
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(deck === '' || deck === 'false') {
            setDeckValid(false);
        } else {
            setDeckValid(true);
        }
        if(question.trim() === '') {
            setQuestionValid(false);
        } else {
            setQuestionValid(true);
        }
        if(answerText.trim() === '') {
            setAnswerTextValid(false);
        } else {
            setAnswerTextValid(true);
        }
        if(deckValid && deck !== 'false' && deck !== '' && questionValid && question.trim() !== '' && AnswerTextValid && answerText.trim() !== '' && fileValid) {
            let card = new FormData();
            card.append('answerText', answerText)
            card.append('question', question)
            card.append('deck', deck)
            card.append('status', 'easy')
            card.append('file', file)
            addCard(card);
            setSucMsg(true)
        }
    }

    if(decks !== null && decks.length === 0 && !loaded) {
        return (
            <div className='margins formHeading pt-110' style={{
                height: '70vh'
            }}>
                <h3>You must create a deck before adding cards!</h3>
            </div>
        )
    }

    return (
        <div>
            {decks !== null ? (
                <form className='margins' onSubmit={handleSubmit}>
                <h1 className='formHeading pt-110'>Add Card</h1>
                <select name='decks' onChange={onDeckChange} value={deck}>
                    <option value='false'>SELECT A DECK</option>
                    {decks.map(deck => (
                        <option value={deck._id}>{deck.title}</option>
                    ))}
                </select>

                {!deckValid &&  <p className='errorMsg red'>Invalid deck.</p>}

                <Input 
                    type='text' 
                    placeholder='FRONT OF CARD(QUESTION)' 
                    value={question} 
                    onChange={e => {
                        setQuestion(e.target.value);
                        setSucMsg(false);
                        setQuestionValid(true)
                    }} />

                {!questionValid &&  <p className='errorMsg red'>A question is required.</p>}
                
                <Input 
                    type='text' 
                    placeholder='BACK OF CARD(ANSWER)' 
                    value={answerText} 
                    onChange={e => {
                        setAnswerText(e.target.value)
                        setSucMsg(false);   
                        setAnswerTextValid(true); 
                        }} />

                {!AnswerTextValid &&  <p className='errorMsg red'>A text answer is required.</p>}
                
                <Input 
                    type={type} 
                    placeholder='ADD AUDIO OR IMAGE TO ANSWER' 
                    focus={() => setType('file')} 
                    onChange={e => {
                        setFile(e.target.files[0])
                        setSucMsg(false);
                        if((/\.(jpe?g|png|m4a|mp4|mp3)$/i).test(e.target.value)) {
                            setFileValid(true)
                        } else {
                            setFileValid(false)
                        } 
                     }} />

                    {!fileValid && 
                        <p className='errorMsg red'>File is invalid. Please upload jpeg, jpg png for an image, or m4a, mp4, mp3 for audio.</p>
                    }
                
                <Button 
                    type='submit' 
                    class={'green mt-50'} 
                    value='ADD CARD' 
                    width='100%' />

                {sucMsg && <p className='sucMsg greenText'>Card was added!</p>}
            </form>
            ) : <Spinner />}
        </div>
    )
}

export default AddCard;