import axios from 'axios'
import { useGlobalLoading } from '../Hooks/useGlobalLoading'


const axiosInstance = axios.create({
  baseURL: 'https://your-api.com', // optional
  headers: {
    'Content-Type': 'application/json',
  },
})

let requestCount = 0

axiosInstance.interceptors.request.use((config) => {
  requestCount++
  useGlobalLoading.getState().setAxiosLoading(true)
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    requestCount--
    if (requestCount === 0) useGlobalLoading.getState().setAxiosLoading(false)
    return response
  },
  (error) => {
    requestCount--
    if (requestCount === 0) useGlobalLoading.getState().setAxiosLoading(false)
    return Promise.reject(error)
  }
)

export default axiosInstance
