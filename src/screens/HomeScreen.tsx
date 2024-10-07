import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherForecast, setError } from '../redux/actions/weatherActions';
import { AppDispatch, RootState } from '../redux/store';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather'
import { buttontext, errorText, inputBackground, inputBorder, shadowColor, textColor, textColorLight } from '../utils/colors';
const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {

  const [city, setCity] = useState('');
  const dispatch = useDispatch<AppDispatch>(); // Correctly typed dispatch
  const { forecast, loading, error } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    getWeather()
  }, [])

  const getWeather = () => {
    const searchCity = city ? city : forecast?.city.name
    if (!searchCity) {
      dispatch(setError("Please enter city."))
      return
    }
    dispatch(fetchWeatherForecast(searchCity)); // Dispatch the action to fetch weather
  };


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats the date to a readable format
  };
  return (<ImageBackground
    source={{ uri: 'https://i.pinimg.com/736x/a4/bc/cf/a4bccf72d851a58ff1819cd9d0bab6c9.jpg' }} // Replace with your image
    style={styles.background}
  >
    <View style={styles.container}>

      <Text style={styles.title}>Today&apos;s Weather</Text>
      <Text testID='city' style={styles.titleCity}>{forecast && forecast.city && forecast.city.name ? forecast.city.name : '-'}</Text>
      <Text style={styles.timestampText}>{forecast && forecast.list && forecast.list.length > 0 && forecast.list[0].dt_txt ? formatDate(forecast.list[0].dt_txt) : '-'}</Text>


      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity onPress={getWeather} style={styles.getWeatherButton} testID="fetchWeatherButton">
          <Icon name="paper-plane" size={20} color="#fff" />
        </TouchableOpacity>
      </View>


      {loading && <Text style={styles.loading}>Loading...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}


      <View style={styles.weatherCard}>

        <Text testID='temperature' style={styles.weatherDetail}>
          <Icon name="thermometer" size={20} /> Temperature: {forecast && forecast.list && forecast.list.length > 0 && forecast.list[0].main && forecast.list[0].main.temp ? forecast.list[0].main.temp : '0'} °C
        </Text>
        <Text testID='Humidity' style={styles.weatherDetail}>
          <Icon name="water" size={20} /> Humidity: {forecast && forecast.list && forecast.list.length > 0 && forecast.list[0].main && forecast.list[0].main.humidity ? forecast.list[0].main.humidity : '0'}%
        </Text>
        <Text testID="Wind" style={styles.weatherDetail}>
          <IconFeather name="wind" size={20} /> Wind Speed: {forecast && forecast.list && forecast.list.length > 0 && forecast.list[0].wind && forecast.list[0].wind.speed ? forecast.list[0].wind.speed : '0'} m/s
        </Text>
        <Text testID='Conditions' style={styles.weatherDetail}>
          Conditions: {forecast && forecast.list && forecast.list.length > 0 && forecast.list[0].weather && forecast.list[0].weather && forecast.list[0].weather.length > 0 && forecast.list[0].weather[0].description ? forecast.list[0].weather[0].description : '-'}
        </Text>

        <TouchableOpacity testID='nextDays' style={styles.navigateButton} onPress={() => navigation.navigate('Weather')}>

          <Text style={styles.navigateButtonText}> Next Days</Text>
          <Icon name="chevron-forward" size={20} color="#f57c00" />
        </TouchableOpacity>

        {/* <Button title="Next Days" onPress={() => navigation.navigate('Weather')} color="#f57c00" /> */}

      </View>

    </View>
  </ImageBackground>

  );
};

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
   
  },
  container: {
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    
    margin: 16,
    padding: 16,
    // backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background with some transparency
  
  },
  getWeatherButton: {
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 10,
    marginStart: 10,
    
  
    padding: 10,

  },
  input: {
  
   
    backgroundColor:inputBackground, // Light background color
    borderColor: inputBorder, // Change border color to a more vibrant one
    borderRadius: 10, // More rounded corners
    borderWidth: 2, // Thicker border
   
    marginBottom: 10,
   
    paddingHorizontal: 15, // Increased horizontal padding
    width: '80%',
  

    fontSize: 16, // Increase font size
    color: textColor, // Dark text color
    height: 50,
    elevation: 3, // Add shadow effect for Android
    shadowColor: shadowColor, // Shadow color for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
  },
  inputContainer:{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  timestampText: {
   
    color: textColorLight, // A lighter color for the timestamp
    fontSize: 14,
    marginVertical: 2,
  },
  title: {
   
    color: textColor,
    fontSize: 28,
    fontWeight: 'bold',


  },
  titleCity: {
    fontSize: 20,
    fontWeight: 'bold',
    //  color: '#333',
  },


  navigateButton: {
    alignItems: 'center',
    flexDirection: 'row',
   
    justifyContent: 'center',
    marginTop: 20,
    // backgroundColor: '#f57c00', // Button color
    padding: 10,

    
  },
  navigateButtonText: {
    color: buttontext,
    fontSize: 16,
    fontWeight: '700',
    marginEnd: 10, // Space between icon and text
 
  },
  error: {
    color: errorText,
    fontSize: 16,
  },
  loading: {
    color: textColorLight,
    fontSize: 16,

  },
  weatherCard: {
    backgroundColor:inputBackground,
    borderRadius: 10,
  

    elevation: 3, // For Android shadow
    marginTop: 20,
    padding: 16,
    shadowColor: shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    
    width: '90%',
  },
  weatherDetail: {
    fontSize: 18,
    marginVertical: 5,
  },
});
export default HomeScreen;