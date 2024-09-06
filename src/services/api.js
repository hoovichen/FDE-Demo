import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  getProducts() {
    return apiClient.get('/products')
  },
  getProduct(id) {
    return apiClient.get(`/products/${id}`)
  },
  createProduct(product) {
    return apiClient.post('/products', product)
  },
  updateProduct(id, product) {
    return apiClient.put(`/products/${id}`, product)
  },
  deleteProduct(id) {
    return apiClient.delete(`/products/${id}`)
  }
}
