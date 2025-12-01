import { Link } from 'react-router';
import './Food.css';

const Food = ({ food, handleAddCart }) => {
    const { id, title, img, subtitle, price } = food;
    return (
        <Link to={'/food/'+id} style={{color:'black'}}>
            <div className='food-container'>
                <div className="food-image">
                    <img src={img} alt="" style={{ width: '100%' }} />
                </div>
                <div className="food-info">
                    <h3>{title}</h3>
                    <p>{subtitle}</p>
                    <h2>${price}</h2>
                </div>
            </div>
        </Link>
    );
};

export default Food;