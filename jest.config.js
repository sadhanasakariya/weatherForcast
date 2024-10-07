// module.exports = {
//   preset: 'react-native',
// };


module.exports = {
  preset: 'react-native',
  testEnvironment: 'node', // Use 'node' for React Native
  testTimeout: 10000,
  transform: {
  //  '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest', // Use ts-jest for TypeScript files
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use babel-jest for JS and TS files
  },
  setupFiles: [
    'react-native-gesture-handler/jestSetup', // Add this if you are using gesture handler
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional: for any additional setup
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js', // Ensure this path is correct
    '\\.(css|less)$': 'identity-obj-proxy', // If you're using CSS modules
    
    //'^react-native$': 'react-native-web', // If you want to mock react-native for web tests
  },
  transformIgnorePatterns: [
   // 'node_modules/(?!(react-native|@react-native|react-native-vector-icons)/)',
     'node_modules/(?!react-native-vector-icons|@react-native|react-native)',
  ],
  collectCoverage: true, // Optional: enable coverage reports
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}', // Adjust this based on your project structure
  ],
};
