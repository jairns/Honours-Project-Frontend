import React , { useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
import { NavLink as Link, useHistory } from 'react-router-dom';
import './Navigation.css'
import AuthContext from '../../Context/Auth/authContext';
import DeckContext from '../../Context/Decks/deckContext';

const NavItems = () => {
    const [isClick, setIsClicked] = useState(false);

    const authContext = useContext(AuthContext);
    const deckContext = useContext(DeckContext);
    const { logout, isAuthenticated } = authContext;
    const { clearDecks } = deckContext;

    const history = useHistory();

    const onLogoutHandler = () => {
        // Calling the logout function from state, which dispatches to reducer 
        logout();
        // Clearing contacts after logout
        clearDecks();

        history.push('/login');
    
    }
    return(
        <div className='navItems'>
            <h1 className='logo'>OMNILINGU</h1>
            <ul className={!isClick ? 'hide' : 'show'}>
                {isAuthenticated ? (
                    <React.Fragment>
                        <li><Link to='/decks' onClick={() => setIsClicked(!isClick)} activeClassName='active'>MY DECKS</Link></li> 
                        <li><Link to='/adddeck' onClick={() => setIsClicked(!isClick)} activeClassName='active'>ADD DECK</Link></li> 
                        <li><Link to='/addcard' onClick={() => setIsClicked(!isClick)} activeClassName='active'>ADD CARD</Link></li> 
                        <li onClick={onLogoutHandler}>LOGOUT</li> 
                    </React.Fragment>
                ) : (
                    <React.Fragment>                        
                        <li><Link to='/home' activeClassName='active'>HOME</Link></li>
                        <li><Link to='/login' activeClassName='active'>LOGIN</Link></li>
                        <li><Link to='/register' activeClassName='active'>REGISTER</Link></li>
                    </React.Fragment>
                )}
            </ul>
            <i className={!isClick ? 'fa fa-bars' : 'fa fa-times'} onClick={() => setIsClicked(!isClick)}></i>
        </div>
    )
}

export default NavItems;

// http://reactcommunity.org/react-transition-group/