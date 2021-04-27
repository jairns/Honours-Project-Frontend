import React , { useState, useContext } from 'react';
import { NavLink as Link, useHistory } from 'react-router-dom';
import './Navigation.css'
import AuthContext from '../../Context/Auth/authContext';
import DeckContext from '../../Context/Decks/deckContext';

const NavItems = () => {

    // Navigation opened or closed
    const [isClick, setIsClicked] = useState(false);

    // Required context
    const authContext = useContext(AuthContext);
    const deckContext = useContext(DeckContext);

    // Functions from context
    const { logout, isAuthenticated } = authContext;
    const { clearDecks } = deckContext;

    // History hook
    const history = useHistory();

    const onLogoutHandler = () => {
        // Calling the logout function from state, which dispatches to reducer 
        logout();
        // Clearing decks after logout
        clearDecks();
        // Redirect to login
        history.push('/login');
    }

    return (
        <div className='navItems'>
            <h1 className='logo'>OMNILINGU</h1>
            <ul className={!isClick ? 'hide' : 'show'}>
                {/* If the user is authenticated */}
                {isAuthenticated ? (
                    // Authenticated nav
                    <React.Fragment>
                        <li><Link to='/decks' onClick={() => setIsClicked(!isClick)} activeClassName='active'>MY DECKS</Link></li> 
                        <li><Link to='/adddeck' onClick={() => setIsClicked(!isClick)} activeClassName='active'>ADD DECK</Link></li> 
                        <li><Link to='/addcard' onClick={() => setIsClicked(!isClick)} activeClassName='active'>ADD CARD</Link></li> 
                        <li onClick={onLogoutHandler}>LOGOUT</li> 
                    </React.Fragment>
                ) : (
                    // Not authenticated nav
                    <React.Fragment>                        
                        <li><Link to='/home' activeClassName='active'>HOME</Link></li>
                        <li><Link to='/login' activeClassName='active'>LOGIN</Link></li>
                        <li><Link to='/register' activeClassName='active'>REGISTER</Link></li>
                    </React.Fragment>
                )}
            </ul>
            {/* If the responsive nav is open - display the close icon; otherwise, display the hamburger */}
            <i className={!isClick ? 'fa fa-bars' : 'fa fa-times'} onClick={() => setIsClicked(!isClick)}></i>
        </div>
    );
}

export default NavItems;