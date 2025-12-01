import './Login.css'
import background from '../../assets/images/bannerbackground.png';
import logo from '../../assets/images/logo2.png';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserProvider';

const Login = () => {
    const { user, signInUser, removeError } = useContext(UserContext);
    console.log('user: ', user);
    const [formData, setFormData] = useState({});
    const location = useLocation();
    const from = location.state || '/';
    const navigate = useNavigate();

    const handleDelete = () => {
        removeError();
    }

    const handleChange = event => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        let isValid = false;
        if (fieldName === 'email') {
            isValid = /\S+@\S+\.\S+/.test(fieldValue);
        } else if (fieldName === 'password') {
            const isLengthValid = fieldValue.length > 6;
            const isContainNumber = /\d{1}/.test(fieldValue);
            isValid = isLengthValid && isContainNumber;
        }
        if (isValid) {
            const newFormData = { ...formData };
            newFormData[fieldName] = fieldValue;
            setFormData(newFormData);
        }
    }

    const handleSubmit = event => {
        signInUser(formData.email, formData.password).then((result) => {
            if (result) {
                navigate(from);
            }
        });
        event.preventDefault();
    }
    console.log(user);
    return (
        <div className='login-container' style={{ backgroundImage: `url(${background})` }}>
            {
                user.error && <div className="error" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>T{user.error}</p>
                    <p onClick={handleDelete} style={{ cursor: 'pointer' }}>X</p>
                </div>
            }
            <div className="logo-container">
                <img src={logo} alt="" />
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={handleChange} placeholder='Email' name="email" id="" />
                    <input type="text" onChange={handleChange} placeholder='Password' name="password" id="" />
                    <button>Log In</button>
                </form>
                <p style={{
                    color: 'orangered', textAlign: 'center',
                    marginTop: '14px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                }}><Link to="/signup" state={from} style={{ fontSize: '18px', fontWeight: '600', color: 'orangered' }}>Create an account</Link></p>
            </div>
        </div>
    );
};

export default Login;