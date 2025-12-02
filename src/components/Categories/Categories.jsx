import './Categories.css';
import { Link, useLocation } from 'react-router';

const Categories = () => {
    const location = useLocation();
    const category = location.state || 'lunch';
    console.log(category);
    return (
        <div className='container'>
            <div className="categories">
                <Link to='/' state={'breakfast'} className={(category === 'breakfast') ? 'active' : ''}>Breakfast</Link>
                <Link to='/' state={'lunch'} className={(category === 'lunch') ? 'active' : ''}>Lunch</Link>
                <Link to='/' state={'dinner'} className={category === 'dinner' ? 'active' : ''}>Dinner</Link>
            </div>
        </div>
    );
};

export default Categories;