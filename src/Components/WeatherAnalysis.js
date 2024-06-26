import React from 'react';
import '../Components/WeatherAnalysis.css'
import { colors } from '@mui/material';

const WeatherAnalysis = ({ location, temperature, humidity, windSpeed, userType }) => {
    if (userType !== 'Farmer') {
        return null;
    }

    let temperatureBenefitsTitle;
    let temperatureBenefits = [];
    let temperatureNegatives = [];

    if (temperature >= 15 && temperature <= 24) {
        temperatureBenefitsTitle = 'Temperature Benefits';
        temperatureBenefits = [
            <p key="optimal-growth">Optimal Growth</p>,
            <p key="reduced-frost">Reduced Frost Damage</p>
        ];
        if (temperature < 15) {
            temperatureNegatives.push(<p key="frost-damage">Frost Damage</p>);
        } else if (temperature > 24) {
            temperatureNegatives.push(<p key="heat-stress">Heat Stress</p>);
        }
    } else {
        temperatureNegatives.push(<p key="temperature-extreme">Extreme Temperature Conditions</p>);
    }

    let humidityBenefitsTitle;
    let humidityBenefits = [];
    let humidityNegatives = [];

    if (humidity >= 40 && humidity <= 72) {
        humidityBenefitsTitle = 'Humidity Benefits';
        humidityBenefits = [
            <p key="adequate-moisture">Adequate Moisture</p>,
            <p key="favorable-conditions">Favorable Conditions for Germination</p>
        ];
        if (humidity < 40) {
            humidityNegatives.push(<p key="reduced-pollination">Reduced Pollination</p>);
        } else if (humidity > 72) {
            humidityNegatives.push(<p key="fungal-diseases">Fungal Diseases</p>);
        }
    } else {
        humidityNegatives.push(<p key="humidity-extreme">Extreme Humidity Conditions</p>);
    }

    let windSpeedBenefitsTitle;
    let windSpeedBenefits = [];
    let windSpeedNegatives = [];

    if (windSpeed >= 2 && windSpeed <= 10) {
        windSpeedBenefitsTitle = 'Wind Speed Benefits';
        windSpeedBenefits = [
            <p key="pollination">Pollination</p>,
            <p key="temperature-regulation">Temperature Regulation</p>
        ];
        if (windSpeed < 2) {
            windSpeedNegatives.push(<p key="low-wind-pollination">Reduced Pollination</p>);
        } else if (windSpeed > 10) {
            windSpeedNegatives.push(<p key="high-wind-damage">Physical Damage</p>);
            windSpeedNegatives.push(<p key="high-wind-evaporation">Increased Evaporation</p>);
        }
    } else {
        windSpeedNegatives.push(<p key="wind-extreme">Extreme Wind Conditions</p>);
    }

    return (
        <div className='weather_analysis'>
            <h2>Weather Data Analysis For Farmers </h2>
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

export default WeatherAnalysis;
