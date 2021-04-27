import React, { useState, useEffect, useContext } from 'react';
import Input from '../../SharedComponents/FormElements/Input';
import Button from '../../SharedComponents/FormElements/Button';
import '../../SharedComponents/FormElements/FormElements.css';
import AuthContext from '../../Context/Auth/authContext';
import DeckContext from '../../Context/Decks/deckContext';

const AddDeck = (props) => {

    // Required context
    const authContext = useContext(AuthContext);
    const deckContext = useContext(DeckContext);

    // Extracting the decks & the filtered state within the context
    const { addDeck } = deckContext;

    // When the page renders
    useEffect(() => {
        // Call the load user function
        authContext.loadUser();
        //eslint-disable-next-line
    }, []);

    // Values
    const [type, setType] = useState('text');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');

    // Validators
    const [titleValid, setTitleValid] = useState(true);
    const [desValid, setDesValid] = useState(true);
    const [fileValid, setFileValid] = useState(true);

    const onSubmitHandler = e => {
        e.preventDefault();
        // Ensuring values are not empty
        if(title.trim() === '') {
            setTitleValid(false);
        } else {
            setTitleValid(true);
        }
        if(description.trim() === '') {
            setDesValid(false);
        } else {
            setDesValid(true);
        }
        if(titleValid && title.trim() !== '' && desValid && description.trim() !== '' && fileValid) {
            // The deck is form data
            let deck = new FormData();
            deck.append('title', title);
            deck.append('description', description);
            deck.append('file', file);
            addDeck(deck);
            // Redirect the user
            props.history.push('/decks');
        }
    } 

    return (
        <div className='margins'>
            <form onSubmit={onSubmitHandler}>
                <h1 className='formHeading pt-110'>Add Deck</h1>

                <Input 
                    type='text' 
                    placeholder='ENTER DECK TITLE'                     
                    name='title' 
                    onChange={e => {
                        setTitle(e.target.value)
                        setTitleValid(true);
                    }}
                    value={title} />
                    {/* Error message */}
                    {!titleValid && 
                        <p className='errorMsg red'>Title is required</p>
                    }
                        
                    <Input 
                        type='text' 
                        placeholder='ENTER DECK DESCRIPTION'                     
                        name='description' 
                        onChange={e =>  {
                            setDescription(e.target.value)
                            setDesValid(true)
                        }}
                        value={description} />
                    {!desValid && 
                        <p className='errorMsg red'>Description is required</p>
                    }

                    {/* File input field */}
                    <Input 
                        type={type} 
                        placeholder='UPLOAD DECK THUMBNAIL' 
                        name='file'
                        // Change file type from text to file
                        focus={() => setType('file')}
                        // Regex for file upload
                        onChange={e => {setFile(e.target.files[0])
                            if((/\.(jpe?g|png)$/i).test(e.target.value)) {
                                setFileValid(true)
                            } else {
                                setFileValid(false)
                            }
                        }} />
                        {!fileValid && 
                            <p className='errorMsg red'>File is invalid. Please upload jpeg, jpg or png</p>
                        }
                            
                    <Button type='submit' class={'green mt-50'} value='ADD DECK' width='100%' />
                </form>
        </div>
    );
}

export default AddDeck;