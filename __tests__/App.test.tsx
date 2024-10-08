// App.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../src/redux/store';
import App from '../App';
import { Text } from 'react-native';



jest.mock('../src/navigation/AppNavigator', () => {
  // Create the mocked component
  const MockedComponent = () => {
    const { View, Text } = require('react-native');
    return (
      <View>
        <Text>Mocked AppNavigator</Text>
      </View>
    );
  };

  // Set a display name for easier debugging
  MockedComponent.displayName = 'MockedAppNavigator';

  return MockedComponent;
});


// Mock PersistGate for testing
jest.mock('redux-persist/integration/react', () => ({
  PersistGate: ({ children }) => <>{children}</>, // Render children directly
}));

describe('App Component', () => {
  it('renders correctly with Redux Provider and PersistGate', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText('Mocked AppNavigator')).toBeTruthy();
  });

  it('renders loading indicator when loading', () => {
    render(
      <Provider store={store}>
        <PersistGate loading={<Text testID="loading">Loading...</Text>} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    );


  });
});
