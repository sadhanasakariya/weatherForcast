import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { buttontext, lightBackground, textColorMedium, weatheritemBackground } from '../utils/colors';

const WeatherScreen: React.FC<{ route: any; navigation: any }> = ({ navigation }) => {

  const [forecastData, setForecastData] = useState<any[]>([]);
  const { forecast, loading } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    if (forecast && forecast.list && forecast.list.length > 0)
      setForecastData(forecast.list)
  }, [forecast])


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats the date to a readable format
  };

  const renderItem = ({ item, index }: { item: any, index: number }) => {
    return (
      <View style={styles.forecastItem}>
        <Text testID={`dateTime-${index}`} style={styles.forecastDate}>{formatDate(item.dt_txt)}</Text>
        <View style={styles.tempContainer}>
          <Text testID={`highTemp-${index}`} style={styles.tempText}>High: <Text style={styles.tempValue}>{item.main.temp_max} °C</Text></Text>
          <Text testID={`lowTemp-${index}`} style={styles.tempText}>Low: <Text style={styles.tempValue}>{item.main.temp_min} °C</Text></Text>
        </View>
        <Text testID={`condition-${index}`} style={styles.conditionText}>Conditions: {item.weather[0].description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navigateButton} onPress={() => navigation.goBack()}>
        <Icon name="chevron-back-outline" size={25} color="#f57c00" />
        <Text style={styles.navigateButtonText}> Back</Text>

      </TouchableOpacity>
      <Text testID='city' style={styles.title}>5-Day Forecast for {forecast && forecast.city && forecast.city.name ? forecast.city.name : '-'}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" testID='activityIndicator' />
      ) : (
        <>
          {forecastData.length > 0 ? (
            <FlatList
              data={forecastData}
              keyExtractor={(item) => item.dt_txt}
              renderItem={renderItem}
              style={styles.forecastList}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text>No forecast data available.</Text>
          )}
        </>
      )}

    </View>

  );
};
const styles = StyleSheet.create({
  forecastItem: {
    backgroundColor: weatheritemBackground,
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
  forecastDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tempContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  tempText: {
    fontSize: 16,
    marginVertical: 2,
  },
  tempValue: {
    fontSize: 20, // Larger font size
    fontWeight: 'bold', // Bold font
    marginLeft: 5, // Space between label and value
  },
  conditionText: {
    fontSize: 16,
    color: textColorMedium,
  },
  forecastList: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: lightBackground,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  navigateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  navigateButtonText: {
    color: buttontext,
    fontWeight: '700',
    fontSize: 20,
  }
});
export default WeatherScreen;