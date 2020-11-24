export const SET_DATA = 'SET_DATA'
export const CLEAR_USER = 'CLEAR_USER'

export const setData = (user) => {
    return {
        type: SET_DATA,
        payload: user
    }
}
export const clearUser = () => {
    return {
        type: CLEAR_USER,
    }
}