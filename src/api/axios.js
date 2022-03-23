import axios from 'axios'
import {getItem} from '@/helpers/persistanceStorage'

axios.defaults.baseURL = 'https://conduit.productionready.io/api'

axios.interceptors.request.use((config) => {
  const token = getItem('accessToken')
  const authToken = token ? `Token ${token}` : ''
  config.headers.Authorization = authToken
  config.headers.UserWhereUniqueInput = 's'
  return config
})

export default axios
