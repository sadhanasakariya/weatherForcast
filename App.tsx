import React from 'react';
import { Provider } from 'react-redux';
import  { store, persistor } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import { Text } from 'react-native';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <PersistGate loading={<Text testID="loading">Loading...</Text>} persistor={persistor}>
      <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

 export default App;