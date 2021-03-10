import axios from "axios"

const axiosWithAuth = () => {
  const token = localStorage.getItem("token")
  return axios.create({
    headers: {
      authorization: token,
    },
    baseURL: `${process.env.REACT_APP_BACKEND}`,
  })
}

export default axiosWithAuth
