import { FETCH_START, FETCH_SUCCESS} from '../actions/index'


const initialState = {
  isLoading: false,
  data: []
};

export const loginReducer = (state = initialState, action ) => {
  switch (action.type) {
    // Fetching Data
    case FETCH_START:
      return {
        ...state,
        isLoading: true,
      }

    // Data Fetched
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      }

      // Default to state
      default:
        return state
  }
};