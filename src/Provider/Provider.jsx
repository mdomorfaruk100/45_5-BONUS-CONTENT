import React from 'react';
import UserProvider from '../context/UserProvider';
import CartProvider from '../context/CartProvider';
import LocationProvider from '../context/LocationProvider';
import CategoryProvider from '../context/CategoryProvider';

const Provider = ({ children }) => {
    return (
        <UserProvider>
            <CartProvider>
                <LocationProvider>
                    <CategoryProvider>
                        {children}
                    </CategoryProvider>
                </LocationProvider>
            </CartProvider>
        </UserProvider>
    );
};

export default Provider;