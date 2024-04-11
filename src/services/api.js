import axios from 'axios'

const axiosApi = axios.create({
    baseURL:'http://localhost:5000',withCredentials:true
})



export{
    axiosApi
}