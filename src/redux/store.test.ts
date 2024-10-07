import { store } from './store'; // Adjust path to your store file
import { setLoading, setError } from './actions//weatherActions'; // Import your actions

describe('Redux Store', () => {
    // Define the initial state structure based on your reducer
    const initialState = {

        forecast: null,
        loading: false,
        error: null,
    };
    it('should have the initial state', () => {
        const state = store.getState();
      
        expect(state.weather).toEqual(initialState);
    });

    it('should handle SET_LOADING action', () => {
        const loadingState = true;
        store.dispatch(setLoading(loadingState)); // Dispatch the loading action
        const state = store.getState();
        expect(state.weather.loading).toEqual(loadingState); // Check the loading state
    });

    it('should handle SET_ERROR action', () => {
        const errorMessage = 'Failed to fetch weather data';
        store.dispatch(setError(errorMessage)); // Dispatch the error action
        const state = store.getState();
        expect(state.weather.error).toEqual(errorMessage); // Check the error message
    });

});