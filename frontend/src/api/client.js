import axios from 'axios'

const api = axios.create({
  baseURL:'',
  baseURLPROD:"https://tinylink-1231.onrender.com"
})

export default api
