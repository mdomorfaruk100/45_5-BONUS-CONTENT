import React from 'react';
import OrderComplete from '../components/OrderComplete/OrderComplete';
import CategoryWithNavigate from '../components/CategoryWithNavigate/CategoryWithNavigate';

const PlaceOrder = () => {
    return (
        <>
           <CategoryWithNavigate />
           <OrderComplete /> 
        </>
    );
};

export default PlaceOrder;