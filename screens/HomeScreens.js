import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Keyboard } from 'react-native';

const API_KEY = 'e3719b5ed542c5709028bf593a831f96';

const WeatherApp = () => {
    const [search, setSearch] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [countryData, setCountryData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`
            );
            if (!response.ok) {
                setNotFound(true);
                throw new Error('Request failed with status code ' + response.status);
            }
            const data = await response.json();
            setWeatherData(data);
            setNotFound(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
            Keyboard.dismiss();
        }

        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${search}`);
            const json = await response.json();
            setCountryData(json[0]);
        } catch (error) {
            console.error('Error fetching country data:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search by city or country"
                value={search}
                onChangeText={setSearch}
            />
            <Button title="Search" onPress={fetchData} />
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
            {notFound && <Text style={styles.notFoundText}>Data not found. Please try again.</Text>}
            {weatherData && countryData && !notFound && (
                <View style={styles.card}>
                    <Text style={styles.title}>{weatherData.name}</Text>
                    <Text style={styles.text}>{`Temperature: ${Math.round(weatherData.main.temp - 273.15)}°C`}</Text>
                    <Text style={styles.text}>{`Weather: ${weatherData.weather[0].description}`}</Text>
                    <Text style={styles.text}>{`Country: ${countryData.name.common}`}</Text>
                    <Text style={styles.text}>{`Capital: ${countryData.capital}`}</Text>
                    <Text style={styles.text}>{`Region: ${countryData.region}`}</Text>
                    <Text style={styles.text}>{`Subregion: ${countryData.subregion}`}</Text>
                    <Text style={styles.text}>{`Population: ${countryData.population}`}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#87CEEB', // Light sky blue background
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        color: '#000',
        backgroundColor: '#B0E0E6', // Powder blue input background
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4682B4', // Steel blue text color
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#2F4F4F', // Dark slate gray text color
        marginBottom: 5,
    },
    notFoundText: {
        fontSize: 16,
        color: 'red',
        marginBottom: 20,
    },
});

export default WeatherApp;
