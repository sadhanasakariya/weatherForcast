import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { NavigationContainer } from '@react-navigation/native';
import WeatherScreen from '../screens/WeatherScreen';

// Create a mock store
const mockStore = configureStore([]);
const store = mockStore({
  weather: {
    forecast: {
      city: { name: 'London' },
      list: [
        {
          dt_txt: '2023-10-01 12:00:00',
          main: { temp_max: 25, temp_min: 15 },
          weather: [{ description: 'Clear sky' }],
        },
        {
          dt_txt: '2023-10-02 12:00:00',
          main: { temp_max: 22, temp_min: 12 },
          weather: [{ description: 'Partly cloudy' }],
        },
      ],
    },
    loading: false,
  },
});


describe('WeatherScreen', () => {



  const renderWithRedux = (component: React.ReactNode) => {
    return render(
      <Provider store={store}>
        <NavigationContainer>
          {component}
        </NavigationContainer>
      </Provider>
    );
  };

  it('renders high temperature correctly', () => {
    render(
      <Provider store={store}>
        <WeatherScreen navigation={{ goBack: jest.fn() }} route={{}} />
      </Provider>
    );

   

    expect(screen.getByTestId('dateTime-0')).toBeTruthy();
    expect(screen.getByTestId('highTemp-0')).toBeTruthy();
    expect(screen.getByTestId('lowTemp-0')).toBeTruthy();
    expect(screen.getByTestId('condition-0')).toBeTruthy();
   
  });


  it('displays no forecast data available when no data is present', () => {
    // Create a mock store with empty forecast data
    const store = mockStore({
        weather: {
            forecast: { 
                city: { name: 'New York' }, // Assuming the city data is needed
                list: [], 
            },
            loading: false,
        },
    });

    render(
      <Provider store={store}>
        <WeatherScreen route={{ params: {} }} navigation={{ goBack: jest.fn() }} />
      </Provider>
    );



    // Assert that the message is displayed
    expect(screen.getByText("No forecast data available.")).toBeTruthy();
});


it('displays loading indicator when loading is true', () => {
  const store = mockStore({
      weather: {
          forecast: {
              city: { name: 'London' },
              list: [],
          },
          loading: true,
      },
  });

  const { getByTestId } = render(
      <Provider store={store}>
          <WeatherScreen route={{ params: {} }} navigation={{ goBack: jest.fn() }} />
      </Provider>
  );

  expect(getByTestId('activityIndicator')).toBeTruthy();
});

  it('navigates back when back button is pressed', async () => {
    const mockGoBack = jest.fn();
    const { getByText } = renderWithRedux(<WeatherScreen route={{ params: {} }} navigation={{ goBack: mockGoBack }} />);

    fireEvent.press(getByText("Back"));
    await waitFor(() => expect(mockGoBack).toHaveBeenCalled());
  });
});



