import React from 'react';
import '../Components/WeatherAnalysis.css'
import { colors } from '@mui/material';

const TravellerAnalysis = ({ location, temperature, humidity, windSpeed, userType }) => {
    if (userType !== 'Traveller') {
        return null;
    }

    let temperatureBenefitsTitle;
    let temperatureBenefits = [];
    let temperatureNegatives = [];

    if (temperature >= 20 && temperature <= 25) {
        temperatureBenefitsTitle = 'Temperature Benefits';
        temperatureBenefits = [
            <p key="optimal-growth">Comfortable Conditions</p>,
            <p key="reduced-frost">Safety</p>
        ];
        if (temperature < 0) {
            temperatureNegatives.push(<p key="frost-damage">Extreme Cold</p>);
        } else if (temperature > 30) {
            temperatureNegatives.push(<p key="heat-stress">Extreme Heat</p>);
        }
    } else {
        temperatureNegatives.push(<p key="temperature-extreme">Extreme Temperature Conditions</p>);
    }

    let humidityBenefitsTitle;
    let humidityBenefits = [];
    let humidityNegatives = [];

    if (humidity >= 40 && humidity <= 60) {
        humidityBenefitsTitle = 'Humidity Benefits';
        humidityBenefits = [
            <p key="adequate-moisture">Balanced Humidity</p>,
            <p key="favorable-conditions">Enjoyment of Scenic Locations</p>
        ];
        if (humidity < 30) {
            humidityNegatives.push(<p key="reduced-pollination">Low Humidity</p>);
        } else if (humidity > 70) {
            humidityNegatives.push(<p key="fungal-diseases">High Humidity</p>);
        }
    } else {
        humidityNegatives.push(<p key="humidity-extreme">Extreme Humidity Conditions</p>);
    }

    let windSpeedBenefitsTitle;
    let windSpeedBenefits = [];
    let windSpeedNegatives = [];

    if (windSpeed >= 5 && windSpeed <= 15) {
        windSpeedBenefitsTitle = 'Wind Speed Benefits';
        windSpeedBenefits = [
            <p key="pollination">Cooling Effect</p>,
            <p key="temperature-regulation">Clear Skies</p>
        ];
        if (windSpeed < 5) {
            windSpeedNegatives.push(<p key="low-wind-pollination">Wind Chill</p>);
        } else if (windSpeed > 30) {
            windSpeedNegatives.push(<p key="high-wind-damage">Strong Winds</p>);
        }
    } else {
        windSpeedNegatives.push(<p key="wind-extreme">Extreme Wind Conditions</p>);
    }

    return (
        <div className='weather_analysis'>
            <h2>Weather Data Analysis For Traveller's</h2>
            <p id='wAloc'>{location}</p>
            <div className='weather_analysis'>
                <h3>Temperature Analysis </h3>
                <p>Temperature: {temperature} °C</p>
                {temperatureBenefitsTitle && <h3 className={temperatureBenefitsTitle.replace(/\s/g, '')}>{temperatureBenefitsTitle}</h3>}
                {temperatureBenefits}
                <h4 className='ngtcls'>Negative Effects</h4>
                {temperatureNegatives.length > 0 ? temperatureNegatives : <p>No specific negatives for this temperature range</p>}

                <h3>Humidity Analysis</h3>
                <p>Humidity: {humidity} %</p>
                {humidityBenefitsTitle && <h3 className={humidityBenefitsTitle.replace(/\s/g, '')}>{humidityBenefitsTitle}</h3>}
                {humidityBenefits}
                <h4 className='ngtcls'>Negative Effects</h4>
                {humidityNegatives.length > 0 ? humidityNegatives : <p>No specific negatives for this humidity range</p>}

                <h3>Wind Speed Analysis</h3>
                <p>Wind Speed: {windSpeed} km/hr</p>
                {windSpeedBenefitsTitle && <h3 className={windSpeedBenefitsTitle.replace(/\s/g, '')}>{windSpeedBenefitsTitle}</h3>}
                {windSpeedBenefits}
                <h4 className='ngtcls'>Negative Effects</h4>
                {windSpeedNegatives.length > 0 ? windSpeedNegatives : <p>No specific negatives for this wind speed range</p>}
            </div>
        </div>
    );
};

export default TravellerAnalysis;
