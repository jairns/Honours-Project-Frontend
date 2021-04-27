import React from 'react';
import NavItems from './NavItems';
import './Navigation.css';

const Navigation = () => {
    return (
        <nav>
            {/* Importing nav items */}
            <NavItems />
        </nav>
    );
}

export default Navigation;