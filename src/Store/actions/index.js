// Import Authentication
import axiosWithAuth from '../../Utilities/Authenticate'

// Action Types
export const FETCH_LOGIN_START = 'FETCH_START'
export const FETCH_LOGIN_SUCCESS = 'FETCH_SUCCESS'

// Action Creators
export const fetchLogin = () => {
    return (dispatch) => {
        // Dispatch Actions
        dispatch({ type: FETCH_LOGIN_START})

        // Fetch Data
        axiosWithAuth()
            .get('BaseURL + endpoint')
            .then(res => {
                console.log(res)
                dispatch({ type: FETCH_LOGIN_SUCCESS, payload: res.data})
            })
            .catch(err => {
                console.log('Error happened in fetch action creator', err)
            })
    }
};
