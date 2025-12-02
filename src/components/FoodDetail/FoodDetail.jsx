import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartProvider';
import { useParams } from 'react-router';
import data from '../../fakeData/data';
import './FoodDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Quantity from '../Quantity/Quantity';

const FoodDetail = () => {
    const { id } = useParams();
    const [cart, setCart] = useContext(CartContext);
    const [food] = useState(data.find(food => food.id === Number(id)));
    const [quantity, setQuantity] = useState(1);

    const handleQuantity = (type) => {
        console.log(type);
        if (type === 'increase') {
            setQuantity(quantity + 1)
        }
        else if (type === 'decrease') {
            setQuantity(quantity - 1);
        }
    }

    const handleAddCart = food => {
        food.quantity = quantity;
        food.itemId = cart.length;
        setCart([...cart, food]);
        console.log(food);
    }

 

    return (
        <>
           
            <div className="container">
                <div className='detail-container'>
                    <div className="food-info">
                        <h2 className='food-title'>{food.title}</h2>
                        <p className='food-description'>{food.description}</p>
                        <div className="info-bottom">
                            <h1>${food.price}</h1>
                            <Quantity quantity={quantity} handleQuantity={handleQuantity} />
                        </div>
                        <button onClick={() => handleAddCart(food)} className='add-cart'>
                            <FontAwesomeIcon icon={faCartShopping} />
                            Add</button>
                    </div>
                    <div className="food-image">
                        <img src={food.img} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default FoodDetail;