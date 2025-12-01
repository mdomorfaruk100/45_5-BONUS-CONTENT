import './Categories.css';
import { Link, useLocation } from 'react-router';

const Categories = () => {
    const location = useLocation();
    return (
        <div className='container'>
            <div className="categories">
                <Link to='/breakfast' className={(location.pathname === '/breakfast') ? 'active' : ''}>Breakfast</Link>
                <Link to='/lunch' className={(location.pathname === '/' || location.pathname === '/lunch') ? 'active' : ''}>Lunch</Link>
                <Link to='/dinner' className={location.pathname === '/dinner'  ? 'active' : ''}>Dinner</Link>
            </div>
        </div>
    );
};

export default Categories;