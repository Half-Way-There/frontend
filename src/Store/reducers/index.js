import { FETCH_LOGIN_START, FETCH_LOGIN_SUCCESS} from '../actions/index'


const initialState = {
  isLoading: false,
  data: []
};

export const fetchLoginReducer = (state = initialState, action ) => {
  switch (action.type) {
    // Fetching Data
    case FETCH_LOGIN_START:
      return {
        ...state,
        isLoading: true,
      }

    // Data Fetched
    case FETCH_LOGIN_SUCCESS:
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