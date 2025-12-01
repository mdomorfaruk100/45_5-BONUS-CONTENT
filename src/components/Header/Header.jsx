import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/images/logo2.png';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import { Link } from 'react-router';

const Header = () => {
    return (
        <div className="nav-container">
            <div className="container">
                <nav>
                    <div className="logo">
                        <img src={logo} alt="" height='40px' />
                    </div>
                    <div className="nav-items">
                        <Link style={{textDecoration:'none', color:'black'}} to='/checkout'>
                            <FontAwesomeIcon className='nav-item cart-icon' icon={faCartShopping} />
                        </Link>
                        <Link to='/login'>
                            <button className='nav-item btn btn-login'>Login</button>
                        </Link>
                        <Link to='/signup'>
                            <button className='nav-item btn btn-signup'>Sign Up</button>
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;