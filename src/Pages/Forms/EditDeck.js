import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Input from '../../SharedComponents/FormElements/Input';
import FilePreview from '../../SharedComponents/FormElements/FilePreview';
import Button from '../../SharedComponents/FormElements/Button';
import Spinner from '../../SharedComponents/Spinner/Spinner';
import '../../SharedComponents/FormElements/FormElements.css';
import AuthContext from '../../Context/Auth/authContext';
import DeckContext from '../../Context/Decks/deckContext';

const EditDeck = (props) => {

    // Extract deck id from query parameter
    let id = props.match.params.id;

    // Get required context
    const authContext = useContext(AuthContext);
    const deckContext = useContext(DeckContext);

    // Extracting functions from the context
    const { updateDeck, deleteThumbnail } = deckContext;

    // Initial deck state
    const [deck, setDeck] = useState({
        title: '',
        description: '',
        file: ''
    });
    const [loaded, setLoaded] = useState(false);
    // input type value
    const [file, setFile] = useState('');
    const [type, setType] = useState('text');
    // Determine if file prev component is displayed
    const [filePrev, setFilePrev] = useState(false); 

    // Validators
    const [titleValid, setTitleValid] = useState(true);
    const [desValid, setDesValid] = useState(true);
    const [fileValid, setFileValid] = useState(true);

    // When the page renders
    useEffect(() => {
        // Call the load user function
        authContext.loadUser();
        // Get the deck
        const getDeck = async () => {
            try {
                const res = await axios.get(process.env.REACT_APP_API_URL + `decks/${id}`);
                // Update the deck state
                setDeck({
                    title: res.data[0].title,
                    description: res.data[0].description,
                    file: res.data[0].file
                });
                // Page can load 
                setLoaded(true);
            } catch (err) {
                console.log(err.response);
            }
        }
        getDeck();
        //eslint-disable-next-line
    }, []);

    // Update the value of a deck property
    const inputHandler = e => setDeck({ ...deck, [e.target.name]: e.target.value });
    
    const deleteFileHandler = () => {
        // Pass the decks id to the delete thumbnail function
        deleteThumbnail(id);
        // Hide the file preview component
        setFilePrev(true);
    }

    const handleSubmit = e => {
        // Prevent the form submitting 
        e.preventDefault();
        // Check if the form is valid
        if(titleValid && deck.title.trim() !== '' && desValid && deck.description.trim() !== '' && fileValid) {
            // Define the data as mulitpart/formdata
            let deckData = new FormData();
            deckData.append('title', deck.title);
            deckData.append('description', deck.description);
            deckData.append('file', file);
            // Pass the new data and id to the update deck function of the deckState
            updateDeck(id, deckData);
            // Redirect
            props.history.push('/decks');
        }
    }

    return (
        <div className='margins'>
            {/* If the data has loaded - display the form */}
            {loaded ? ( 
                <form onSubmit={handleSubmit}>
                    <h1 className='formHeading pt-110'>Edit Deck</h1>

                    <Input 
                        type='text' 
                        placeholder='ENTER DECK TITLE'                     
                        name='title' 
                        value={deck.title}
                        onChange={e => {
                            // Update the values state
                            inputHandler(e);
                            // Check if the value is not empty
                            if(e.target.value !== '') {
                                setTitleValid(true);
                            } else {
                                setTitleValid(false);
                            }
                        }} />     
                    {/* Error message */}
                    {!titleValid && 
                        <p className='errorMsg red'>Title is required</p>
                    }
                    
                    <Input 
                        type='text' 
                        placeholder='ENTER DECK DESCRIPTION'                     
                        name='description' 
                        value={deck.description}
                        onChange={e => {
                            inputHandler(e);
                            if(e.target.value !== '') {
                                setDesValid(true);
                            } else {
                                setDesValid(false);
                            }
                        }} />
                    {!desValid && 
                        <p className='errorMsg red'>Description is required</p>
                    }
                    
                    {deck.file !== 'null' && deck.file && !filePrev && (
                        <FilePreview 
                            label='Thumbnail' 
                            file={process.env.REACT_APP_FILE_URL + `${deck.file}`} 
                            type='image' 
                            onClick={deleteFileHandler} />
                    )}

                    <Input 
                        type={type} 
                        placeholder='UPLOAD DECK THUMBNAIL' 
                        name='thumbnail'
                        focus={() => setType('file')} 
                        onChange={e => {setFile(e.target.files[0])
                            if((/\.(jpe?g|png)$/i).test(e.target.value)) {
                                setFileValid(true);
                            } else {
                                setFileValid(false);
                            }
                        }} />
                        {!fileValid && 
                            <p className='errorMsg red'>File is invalid. Please upload jpeg, jpg or png</p>
                        }
                    
                    <Button type='submit' class={'green mt-50'} value='EDIT DECK' width='100%' />
                    <Link to='/decks' className='link underline red'>Cancel</Link>
                </form>
            ) : (
                <Spinner />
            )}
        </div>
    );
}

export default EditDeck;