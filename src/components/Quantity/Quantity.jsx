import './Quantity.css';

const Quantity = ({quantity, handleQuantity}) => {
    return (
        <div className="quantity">
            <button onClick={()=>handleQuantity('decrease')}>-</button>
            <span>{quantity.toString().padStart(2, '0')}</span>
            <button onClick={()=>handleQuantity('increase')}>+</button>
        </div>
    );
};

export default Quantity;