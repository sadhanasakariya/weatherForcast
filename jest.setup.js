// import 'react-native-gesture-handler/jestSetup'; // Setup for gesture handler

jest.mock('@react-native-async-storage/async-storage', () => {
    return {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };
  });

  // Mock persistStore
jest.mock('redux-persist', () => ({
    persistStore: jest.fn(() => ({
        purge: jest.fn(),
        flush: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
    })),
    persistReducer: jest.requireActual('redux-persist').persistReducer,
}));



