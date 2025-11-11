import { Link } from 'react-router';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div className='header'>
            <img src={logo} alt="ema-john" />
            <nav>
                <Link to='/shop'>Shop</Link>
                <Link to='/review'>Order Review</Link>
                <Link to='/inventory'>Inventory</Link>
            </nav>
        </div>
    );
};

export default Header;