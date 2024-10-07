

import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; 
import AppNavigator from './AppNavigator';

const mockStore = configureStore([]);
const store = mockStore({
  weather: {
    weather: null, // or mock data
    loading: false,
    error: null,
  },
});

describe('AppNavigator', () => {
  it('renders the HomeScreen by default', () => {
    const { getByText } = render(
      <Provider store={store}>
          <AppNavigator />
      </Provider>
    );

    // Check for specific text or elements in HomeScreen
    expect(getByText("Today's Weather")).toBeTruthy(); // Adjust based on what HomeScreen renders
  });
});
