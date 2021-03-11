export const SET_DATA = "SET_DATA"
export const CLEAR_USER = "CLEAR_USER"
export const SET_SEARCH = "SET_SEARCH"

// Set User Data
export const setData = (user) => ({
  type: SET_DATA,
  payload: user,
});

// Clear User
export const clearUser = () => ({
  type: CLEAR_USER,
});

// Set Search Information
export const setSearch = (search) => ({
    type: SET_SEARCH,
    payload: search
})
