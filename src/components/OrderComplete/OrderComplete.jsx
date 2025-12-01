import './OrderComplete.css';
import orderComplete from '../../assets/images/ordercomplete.png';
import bike from '../../assets/images/Group 1151.png';
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider.jsx';
import userImage from '../../assets/images/Group 1152.png';
import { LocationContext } from '../../context/LocationProvider.jsx';

const OrderComplete = () => {
    const { user } = useContext(UserContext);
    const {location} = useContext(LocationContext);
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    let hours = now.getHours();
    if (hours > 12) {
        hours = hours - 12;
    }
    const minutes = now.getMinutes();

    return (
        <div className='container'>
            <div className="complete-container">
                <div className="map-container">
                    <img src={orderComplete} alt="" />
                </div>
                <div className="user-container">
                    <div className="image-box">
                        <div className="image">
                            <img src={bike} alt="" height={'100px'} />
                        </div>
                    </div>
                    <div className="location-box">
                        <div className="dot-content">
                            <hr />
                        </div>
                        <div className="info-content">
                            <h2>Your Location</h2>
                            <p>{location.roadNo}</p>
                            <h2 style={{ marginTop: '21px' }}>Shop Address</h2>
                            <p>Gulshan Pizza Restaura GRP</p>
                        </div>
                    </div>
                    <div className="time-box">
                        <h1>{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`}</h1>
                        <p>Estimated delivery time</p>
                    </div>
                    <div className="user-box">
                        <div className="user">
                            <div className="user-image">
                                <img src={userImage} alt="" />
                            </div>
                            <div className="user-info">
                                <h2>{user.name}</h2>
                                <p>Your raider</p>
                            </div>
                        </div>
                    </div>
                    <button>Contact</button>
                </div>
            </div>
        </div>
    );
};

export default OrderComplete;