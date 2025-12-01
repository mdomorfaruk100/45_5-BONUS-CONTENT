import Quantity from '../Quantity/Quantity';
import './Cart.css';

const Cart = ({ food, handleQuantity }) => {
    return (
        <div className='cart-item'>
            <div className="left">
                <img src={food.img} alt="" />
            </div>
            <div className="center">
                <p><strong>{food.title}</strong></p>
                <p className='product-price'><strong>${food.price}</strong></p>
                <p style={{color:'#949d9e'}}><small>Delivery Free</small></p>
            </div>
            <div className="right">
                <Quantity handleQuantity={handleQuantity} quantity={food.quantity} />
            </div>
        </div>
    );
};

export default Cart;