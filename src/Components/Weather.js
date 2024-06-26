import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';
import clear_img from '../Assets/clear.png';
import cloud_img from '../Assets/cloud.png';
import drizzle_img from '../Assets/drizzle.png';
import humidity_img from '../Assets/humidity.png';
import rain_img from '../Assets/rain.png';
import snow_img from '../Assets/snow.png';
import wind_img from '../Assets/wind.png';
import WeatherAnalysis from './WeatherAnalysis';
import TravellerAnalysis from './TravellerAnalysis';

const useStyle = makeStyles({
    search_icon: {
        color: 'grey',
        marginLeft: '10px',
        background: '#ebfffc',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        padding: '2px',
        fontSize: '50px',
        '&:hover': {
            cursor: 'pointer',
        },
    },
});

const apiKey = '642404ff07c5e1d62ae94a01fff16e7b';
const days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
};
const Months = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
};

const weather_Icons = {
    '01d': clear_img,
    '01n': clear_img,
    '02d': cloud_img,
    '02n': cloud_img,
    '03d': cloud_img,
    '03n': cloud_img,
    '04d': drizzle_img,
    '04d': drizzle_img,
    '10d': rain_img,
    '10n': rain_img,
    '13d': snow_img,
    '13n': snow_img,
};

const Weather = () => {
    const [weatherData, setWeatherData] = useState(false);
    const inputRef = useRef();
    const classes = useStyle();
    const [dateAndTime, setDateAndTime] = useState();
    const [userType, setUserType] = useState('Select User');

    const getDateTimeandDay = () => {
        const date = new Date();
        const DD = date.getDate();
        const MM = date.getMonth() + 1;
        const YYYY = date.getFullYear();
        const hrs = date.getHours();
        const min = date.getMinutes();
        const sec = date.getSeconds();
        const day = date.getDay();

        const tempdateAndTime = `${hrs} : ${min}   ${days[day]} , ${DD}-${Months[MM]}-${YYYY}`;
        setDateAndTime(tempdateAndTime);
    };

    const search = async (cityName) => {
        if (cityName === '') {
            alert('Please Enter City Name....!');
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            const imgId = weather_Icons[data.weather[0].icon] || clear_img;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                icon: imgId,
                location: cityName,
            });
            getDateTimeandDay();
        } catch (error) {
            alert('Please Check City Name You Entered....!');
        }
    };

    const onUserChange = (event) => {
        const userType = event.target.value;
        setUserType(userType);
    };

    useEffect(() => {
        search('Hyderabad');
        getDateTimeandDay();
    }, [userType]);

    const getBackgroundColor = (temperature) => {
        if (temperature < 10) {
            return '#a3d8f4'; // cold: light blue
        } else if (temperature >= 10 && temperature < 20) {
            return '#f7d6a0'; // mild: light orange
        } else if (temperature >= 20 && temperature < 30) {
            return '#f4a3a3'; // warm: light red
        } else {
            return '#f49042'; // hot: orange
        }
    };

    return (
        <div
            className='weather'
            style={{
                backgroundColor: weatherData ? getBackgroundColor(weatherData.temperature) : 'linear-gradient(45deg, #5999a4, #0d2a34, #FFFFFF)',
            }}
        >
            <div className='search_bar'>
                <input ref={inputRef} type='text' placeholder='Search' />
                <SearchIcon onClick={() => search(inputRef.current.value)} className={classes.search_icon} />
                <select name='user_type' id='userType' onChange={onUserChange} value={userType}>
                    <option value='select user'>Select User</option>
                    <option>Farmer</option>
                    <option>Traveller</option>
                </select>
            </div>

            {userType === 'Select User' && weatherData && (
                <>
                    <div className='weather_icon'>
                        <img src={weatherData.icon} alt='' />
                        <p>{weatherData.temperature} °C</p>
                        <p id='loc'>{weatherData.location}</p>
                        <span>{dateAndTime}</span>
                    </div>
                    <div className='weather_data'>
                        <div className='weather_leftData'>
                            <img src={humidity_img} alt='' />
                            <p>{weatherData.humidity}%</p>
                            <span>Humidity</span>
                        </div>
                        <div className='weather_rightData'>
                            <img src={wind_img} alt='' />
                            <p>{weatherData.windSpeed} Km/h</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </>
            )}

            <WeatherAnalysis
                location={weatherData ? weatherData.location : 0}
                temperature={weatherData ? weatherData.temperature : 0}
                humidity={weatherData ? weatherData.humidity : 0}
                windSpeed={weatherData ? weatherData.windSpeed : 0}
                userType={userType}
            />
            <TravellerAnalysis
                location={weatherData ? weatherData.location : 0}
                temperature={weatherData ? weatherData.temperature : 0}
                humidity={weatherData ? weatherData.humidity : 0}
                windSpeed={weatherData ? weatherData.windSpeed : 0}
                userType={userType}
            />
            {userType === 'Traveller' && <div className='traveller_bgn'></div>}
        </div>
    );
};

export default Weather;
