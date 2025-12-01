import hero from '../../assets/images/bannerbackground.png';
import './Hero.css';
const Hero = () => {
    const heroStyle = {
        backgroundImage: `url(${hero})`,
    }
    return (
        <div style={heroStyle} className='hero'>
            <h1>Best food waiting for your belly.</h1>
            <div className="search">
                <input type="text" placeholder='Search food items' />
                <button className='btn search-btn'>Search</button>
            </div>
        </div>
    );
};

export default Hero;