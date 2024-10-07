// import React from 'react';
// import { render, fireEvent } from '@testing-library/react-native';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
// import { NavigationContainer } from '@react-navigation/native';
// import HomeScreen from '../screens/HomeScreen';
// import { fetchWeather } from '../redux/actions/weatherActions';
// import ErrorBoundary from './ErrorBoundry';

// const mockStore = configureStore([]);


// const store = mockStore({
//   weather: {
//     weather: null, // or mock data
//     loading: false,
//     error: null,
//   },
// });

// // describe('AppNavigator', () => {
// //   it('renders the HomeScreen by default', () => {
// //     const { getByText } = render(
// //       <Provider store={store}>
// //         <HomeScreen navigation={{ navigate: jest.fn() }} />
// //       </Provider>
// //     );

// //     // Add your assertions here, e.g., checking for specific text or elements in HomeScreen
// //     expect(getByText("Today's Weather")).toBeTruthy();
// //   });
// // });



// describe('HomeScreen', () => {
//   let store: any;

//   beforeEach(() => {
//     store = mockStore({
//       weather: {
//         weather: null,
//         loading: false,
//         error: null,
//       },
//     });
//   });

//   it('renders correctly and allows fetching weather', async () => {
//     const { getByText, getByPlaceholderText } = render(
//       <Provider store={store}>
//         <HomeScreen navigation={{ navigate: jest.fn() }} />
//       </Provider>
//     );

//     // Check if the title is rendered
//     expect(getByText("Today's Weather")).toBeTruthy();

//     // Interact with the TextInput and fetch button
//     const cityInput = getByPlaceholderText('Enter city name');
//     fireEvent.changeText(cityInput, 'London');

//     const fetchButton = getByText('Next Days'); // Assuming this is your button to fetch weather
//     fireEvent.press(fetchButton);

//     // Assuming you have a loading state, you can simulate the loading state here
//     // (you may need to mock the fetchWeather action and test its invocation)

//     // You can also check for any error message
//     // expect(getByText('Please enter city.')).toBeTruthy();
//   });

//   it('displays loading text while fetching data', async () => {
//     store = mockStore({
//       weather: {
//         weather: null,
//         loading: true, // Simulate loading state
//         error: null,
//       },
//     });

//     const { getByText } = render(
//       <Provider store={store}>
//         <HomeScreen navigation={{ navigate: jest.fn() }} />
//       </Provider>
//     );

//     expect(getByText('Loading...')).toBeTruthy(); // Ensure loading text is displayed
//   });

//   it('displays error message if there is an error', async () => {
//     store = mockStore({
//       weather: {
//         weather: null,
//         loading: false,
//         error: 'Failed to fetch weather data', // Simulate an error
//       },
//     });

//     const { getByText } = render(
//       <Provider store={store}>
//         <HomeScreen navigation={{ navigate: jest.fn() }} />
//       </Provider>
//     );

//     expect(getByText('Failed to fetch weather data')).toBeTruthy(); // Ensure error message is displayed
//   });
// });




// // describe('HomeScreen', () => {
// //   let store: any;

// //   beforeEach(() => {
// //     store = mockStore({
// //       weather: {
// //         weather: {
// //           name: "New York",
// //           main: { temp: 20, humidity: 50 },
// //           wind: { speed: 5 },
// //           weather: [{ description: "clear sky" }],
// //           timestamp: Date.now() / 1000, // Current timestamp
// //         },
// //         loading: false,
// //         error: null,
// //       },
// //     });
// //   });

// //   const renderWithRedux = (component: React.ReactNode) => {
// //     return render(
// //         <Provider store={store}>
// //         <NavigationContainer>
// //             <ErrorBoundary>
// //                 {component}
// //             </ErrorBoundary>
// //         </NavigationContainer>
// //     </Provider>
// //     );
// //   };

// //   it('renders correctly', () => {
// //     const { getByText, getByPlaceholderText } = renderWithRedux(<HomeScreen navigation={{ navigate: jest.fn() }} />);
// //     expect(getByText("Today's Weather")).toBeTruthy();
// //     expect(getByPlaceholderText("Enter city name")).toBeTruthy();
// //   });

// //   it('displays error message when city is not provided', () => {
// //     store = mockStore({
// //       weather: {
// //         weather: null,
// //         loading: false,
// //         error: "Please enter city.",
// //       },
// //     });

// //     const { getByText } = renderWithRedux(<HomeScreen navigation={{ navigate: jest.fn() }} />);
// //     expect(getByText("Please enter city.")).toBeTruthy();
// //   });

// //   it('calls fetchWeather action when the button is pressed', () => {
// //     const spy = jest.spyOn(store, 'dispatch');
  
// //     const { getByPlaceholderText, getByTestId } = renderWithRedux(<HomeScreen navigation={{ navigate: jest.fn() }} />);
  
// //     const input = getByPlaceholderText("Enter city name");
// //     fireEvent.changeText(input, 'New York');
  
// //     // Use getByTestId to find the button
// //     const button = getByTestId('fetchWeatherButton');
// //     fireEvent.press(button);
  
// //     expect(spy).toHaveBeenCalledWith(fetchWeather('New York'));
// //   });
// // });





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
