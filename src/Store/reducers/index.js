import { SET_DATA, CLEAR_USER, SET_SEARCH } from '../actions'


const initialState = {
    data: {
      user: null,
      contacts: []
    },
    searchInfo: null
}

const Reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_DATA: 
            return {
                ...state,
                data: action.payload
            }
        case CLEAR_USER:
            return {
                ...state,
                data: {
                  user: null,
                  contacts: []
                }
            }
        case SET_SEARCH:
            return {
                ...state,
                searchInfo: action.payload
            }
        default:
            return state
    }
}

export default Reducer
