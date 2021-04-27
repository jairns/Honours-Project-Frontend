import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../SharedComponents/Modal/Modal';
import AuthContext from '../../Context/Auth/authContext';
import './Footer.css';

const FooterItems = () => {

    // Delete account modal
    const modalRef = React.useRef();

    // Open modal
    const openModal = () => {
        modalRef.current.openModal()
    };

    // Importing auth context
    const authContext = useContext(AuthContext);

    // Extracting isAuthentication from authContext
    const { isAuthenticated } = authContext;

    return (
        <footer>
            <Modal ref={modalRef} title={'Account'} text={'account'} />
            <div className='footerItems'>
                {/*If the user is authenticated, display delete account */}
                {isAuthenticated && (
                    <p onClick={openModal} className='footerText'>Delete Account</p>
                )}
                {/* GDPR page */}
                <Link to='/gdpr'><p className='footerText'>Data Protection Policy</p></Link>
            </div>
        </footer>
    );
}

export default FooterItems;