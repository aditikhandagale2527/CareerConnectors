import API from './config'

export const registerUser = async (data: {
  name: string
  email: string
  password: string
  role: string
}) => {
  const response = await API.post('/api/users/register', data)
  return response.data
}

export const loginUser = async (data: {
  email: string
  password: string
}) => {
  const response = await API.post('/api/users/login', data)
  return response.data
}

export const getMe = async () => {
  const response = await API.get('/api/users/me')
  return response.data
}
