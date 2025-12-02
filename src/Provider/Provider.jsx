import React from 'react';
import UserProvider from '../context/UserProvider';
import CartProvider from '../context/CartProvider';
import LocationProvider from '../context/LocationProvider';

const Provider = ({children}) => {
    return (
        <UserProvider>
            <CartProvider>
                <LocationProvider>
                    {children}
                </LocationProvider>
            </CartProvider>
        </UserProvider>
    );
};

export default Provider;