import axios from 'axios';

const setAuthToken = token => {
    // If a token exists
    if(token) {
        // Set it as a default header; thus always sending it when making requests if the user is authenticated
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        // If theres not a token passed, delete the header
       delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;