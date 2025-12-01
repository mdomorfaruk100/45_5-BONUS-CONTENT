import './SignUp.css'
import background from '../../assets/images/bannerbackground.png';
import logo from '../../assets/images/logo2.png';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { UserContext } from '../../context/UserProvider';

const SignUp = () => {
    const { user, signUpUser, removeError } = useContext(UserContext);
    const [formData, setFormData] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state || '/';

    const handleChange = event => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        let isValid = true;
        if (fieldName === 'email') {
            isValid = /\S+@\S+\.\S+/.test(fieldValue);
        } else if (fieldName === 'password') {
            const isLengthValid = fieldValue.length > 6;
            const isContainNumber = /\d{1}/.test(fieldValue);
            isValid = isLengthValid && isContainNumber;
            console.log(isValid, isLengthValid, isContainNumber);
        } else if (fieldName === 'confirmPassword') {
            const isLengthValid = fieldValue.length > 6;
            const isContainNumber = /\d{1}/.test(fieldValue);
            const isMatch = fieldValue == formData.password;
            isValid = isLengthValid && isContainNumber && isMatch;
        }

        if (isValid) {
            const newFormData = { ...formData };
            newFormData[fieldName] = fieldValue;
            setFormData(newFormData)
        }
    }

    const onSubmit = event => {
        signUpUser(formData.name, formData.email, formData.password).then(res => {
            if (res) {
                navigate(from);
            }
        })
        event.preventDefault();
    }

    return (
        <div className='login-container' style={{ backgroundImage: `url(${background})` }}>
            {
                user.error && <div className="error" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>T{user.error}</p>
                    <p onClick={() => removeError()} style={{ cursor: 'pointer' }}>X</p>
                </div>
            }
            <div className="logo-container">
                <img src={logo} alt="" />
            </div>
            <div className="form-container">
                <form onSubmit={onSubmit}>
                    <input type="text" onChange={handleChange} placeholder='Name' name="name" id="" />
                    <input type="text" onChange={handleChange} placeholder='Email' name="email" id="" />
                    <input type="text" onChange={handleChange} placeholder='Password' name="password" id="" />
                    <input type="text" onChange={handleChange} placeholder='Confirm Password' name="confirmPassword" id="" />
                    <button>Sign In</button>
                </form>
                <p style={{
                    color: 'orangered', textAlign: 'center',
                    marginTop: '14px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                }}><Link to='/login' state={from} style={{ fontSize: '18px', fontWeight: '600', color: 'orangered' }}>Already have an account</Link></p>
            </div>
        </div>
    );
};

export default SignUp;