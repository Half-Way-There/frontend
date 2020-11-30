import { SET_DATA, CLEAR_USER } from '../actions'


const initialState = {
    data: {
      user: null,
      contacts: []
    }
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
        default:
            return state
    }
}

export default Reducer
