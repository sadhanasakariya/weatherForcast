// HomeScreen.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../redux/reducers';
import HomeScreen from './HomeScreen';


const mockNavigation = {
  navigate: jest.fn(),
};

describe('HomeScreen', () => {
  const initialState = {
    weather: {
    forecast:null,
      loading: false,
      error: null,
    },
  };

  const store = createStore(rootReducer, initialState);

  it('renders correctly and allows navigation to Next Days', () => {
    render(
      <Provider store={store}>
        <HomeScreen navigation={mockNavigation} />
      </Provider>
    );

    // Check if the title and weather data are rendered
    expect(screen.getByText("Today's Weather")).toBeTruthy();
    expect(screen.getByTestId('city')).toBeTruthy();
    expect(screen.getByTestId('temperature')).toBeTruthy();
    expect(screen.getByTestId('Humidity')).toBeTruthy();
    expect(screen.getByTestId('Wind')).toBeTruthy();
    expect(screen.getByTestId('Conditions')).toBeTruthy();

    // Check for the "Next Days" button using testID
    const nextDaysButton = screen.getByTestId('nextDays');
    expect(nextDaysButton).toBeTruthy();

    // Simulate pressing the button
    fireEvent.press(nextDaysButton);

    // Check that the navigate function is called correctly
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Weather');

  });
});