import axios from '@/api/axios'

const register = (credentials) => {
  return axios.post('/users', {user: credentials})
}

const auth = (credentials) => {
  return axios.post('/users/login', {user: credentials})
}

const getCurrentUser = () => {
  return axios.get('/user')
}

export default {
  getCurrentUser,
  register,
  auth,
}
