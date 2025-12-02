import React from 'react';
import { useNavigate } from 'react-router';

const CategoryWithNavigate = () => {
    const navigate  = useNavigate();
       const onNavigate = state => {
        navigate('/', { state: state  });
    }
    return (
         <div className="container">
                <div className="categories">
                    <span onClick={() => onNavigate('breakfast')}>Breakfast</span>
                    <span onClick={() => onNavigate('lunch')}>Lunch</span>
                    <span onClick={() => onNavigate('dinner')}>Dinner</span>
                </div>
            </div>
    );
};

export default CategoryWithNavigate;