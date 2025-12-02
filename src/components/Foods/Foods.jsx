import { useNavigate, useParams } from 'react-router';
import data from '../../fakeData/data';
import Food from '../Food/Food';
import './Foods.css';
import { useContext } from 'react';
import { CartContext } from '../../context/CartProvider';
import { CategoryContext } from '../../context/CategoryProvider';

const Foods = () => {
    const [category] = useContext(CategoryContext);
    const navigate = useNavigate();
    const [cart] = useContext(CartContext)
    const foods = data.filter(food => food.category === category);

    const handleCheckOut = () => {
        navigate('/checkout');
    }

    return (
        <div className='container'>
            <div className='foods'>

                {
                    foods.map(food => <Food key={food.id} food={food} />)
                }
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={handleCheckOut} className={cart.length > 0 ? 'active-button' : 'disable-button'}>Checkout Your Food</button>
            </div>
        </div>
    );
};

export default Foods;