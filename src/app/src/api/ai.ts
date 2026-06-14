import API from './config'

export const getRecommendations = async (skills: string[]) => {
  const response = await API.post('/api/ai/recommend', { skills })
  return response.data
}
