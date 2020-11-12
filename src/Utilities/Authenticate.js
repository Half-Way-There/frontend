import axios from 'axios'

export const authenticate = () => {

    const token = 'token location'

    return axios.create({
        headers: {
            Authorize: token
        },
        baseURL: 'http request'
    })
};