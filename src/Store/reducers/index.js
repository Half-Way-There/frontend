import { combineReducers } from 'redux'
import userReducer from './user.reducer'
import contactsReducer from './contacts.reducer'
import locationsReducer from './locations.reducer'

const reducer = combineReducers({
  user: userReducer,
  contacts: contactsReducer,
  locations: locationsReducer
})

export default reducer