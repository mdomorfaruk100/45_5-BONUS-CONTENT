import React, { useContext } from 'react';
import { CartContext } from '../../context/CartProvider';
import { useForm } from 'react-hook-form';
import './CheckOut.css';
import Cart from '../Cart/Cart';
import { useNavigate } from 'react-router';
import { LocationContext } from '../../context/LocationProvider';

const CheckOut = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [cart, setCart] = useContext(CartContext);
    const { location, setLocation } = useContext(LocationContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log('data ', data);
        if (Object.keys(errors).length < 1) {
            setLocation({ ...data, hasAny: true });
        }
    }

    const handleQuantity = (food, type) => {
        if (type === 'increase') {
            const others = cart.filter(item => item.itemId !== food.itemId);
            const newItem = { ...food, quantity: food.quantity + 1 };
            const currentIndex = cart.indexOf(food);
            const newCart = [...cart];
            newCart[currentIndex] = newItem;
            setCart(newCart);
        }
        if (type === 'decrease') {
            if (food.quantity === 1) {
                return;
            }
            const newItem = { ...food, quantity: food.quantity - 1 };
            const currentIndex = cart.indexOf(food);
            const newCart = [...cart];
            newCart[currentIndex] = newItem;
            setCart(newCart);
        }
    }

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + (item.quantity * item.price), 0);
    const tax = totalPrice * 0.01;
    let deliveryFee = 0;
    if (totalPrice > 35) {
        deliveryFee = 0;
    } else if (totalPrice > 15) {
        deliveryFee = 6.99;
    } else if (totalPrice > 0) {
        deliveryFee = 8.99;
    }

    const grandTotal = totalPrice + tax + deliveryFee;

    const formatNumber = num => {
        const fixedNumber = num.toFixed(2);
        return Number(fixedNumber);
    }

    return (
        <div className='container'>
            <div className="checkout-container">
                <div className="left-container">
                    <div className="sec-title">
                        <h1>Edit Delivery Details</h1>
                    </div>
                    <div className="ship-form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" defaultValue={location.deliveryDoor ? location.deliveryDoor : 'Delivery To Door'} {...register('deliveryDoor', { required: true })} />
                            <input type="text" defaultValue={location.roadNo ? location.roadNo : '107 Rd No 8'}  {...register('roadNo', { required: true })} />
                            <input type="text" defaultValue={location.floor ? location.floor : ''} placeholder='Flat, suite or floor'  {...register('floor', { required: true })} />
                            <input type="text" defaultValue={location.businessName ? location.businessName : ''} placeholder='Business Name'  {...register('businessName', { required: true })} />
                            <textarea defaultValue={location.deliveryInstructor ? location.deliveryInstructor : ''} placeholder='Add Delivery instructor' {...register('deliveryInstructor', { required: true })}></textarea>
                            <button type="submit">Save & Continue</button>
                        </form>
                    </div>
                </div>
                <div className="right-container">
                    <div className="delivery-info">
                        <p>From <strong>Gulshan Flaza Restaura GPR</strong></p>
                        <p>Arriving in 20-30 min</p>
                        <p>107 Rd No 8</p>
                        {
                            cart.map(item => <Cart handleQuantity={(type) => handleQuantity(item, type)} key={item.itemId} food={item} />)
                        }
                        <div className="order-detail">
                            <p>Subtotal . {totalItems} item &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ${formatNumber(totalPrice)}</p>
                            <p>Tax: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{formatNumber(tax)}</p>
                            <p>Delivery fee: &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ${deliveryFee}</p>
                            <h4>Total: &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ${formatNumber(grandTotal)} </h4>
                            <button style={{ width: '265px', marginTop: '20px' }} disabled={(totalItems > 0 && location.hasAny) ? false : true} onClick={() => navigate('/place-order')} className={(totalItems > 0 && location.hasAny) ? 'active-button' : 'disable-button'}>Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;