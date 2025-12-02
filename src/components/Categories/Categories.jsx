import { useContext, useEffect } from 'react';
import './Categories.css';
import { useLocation } from 'react-router';
import { CategoryContext } from '../../context/CategoryProvider';

const Categories = () => {
    const location = useLocation();
    const [category, setCategoryContext] = useContext(CategoryContext);

    useEffect(() => {
            setCategoryContext(location.state || 'lunch');
    }, []);

    const handleCategory = category => {
        setCategoryContext(category);
    }
    return (
        <div className='container'>
            <div className="categories">
                <span onClick={() => handleCategory('breakfast')} className={category === 'breakfast' ? 'active' : ''}>Breakfast</span>
                <span onClick={() => handleCategory('lunch')} className={category === 'lunch' ? 'active' : ''}>Lunch</span>
                <span onClick={() => handleCategory('dinner')} className={category === 'dinner' ? 'active' : ''}>Dinner</span>
            </div>
        </div>
    );
};

export default Categories;