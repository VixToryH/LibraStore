import axios from 'axios'

const API_URL = 'http://localhost:3001'

export const getInventory = () => {
  return axios.get(`${API_URL}/inventory`)
}

export const getInventoryById = (id) => {
  return axios.get(`${API_URL}/inventory/${id}`)
}

export const createInventory = (data) => {
  return axios.post(`${API_URL}/inventory`, data)
}

export const updateInventory = (id, data) => {
  return axios.put(`${API_URL}/inventory/${id}`, data)
}

export const updateInventoryPhoto = (id, formData) => {
    return axios.put(`${API_URL}/inventory/${id}/photo`, formData)
  }

export const deleteInventory = (id) => {
  return axios.delete(`${API_URL}/inventory/${id}`)
}