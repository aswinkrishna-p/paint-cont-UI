import { axiosApi } from "../services/api"
import userRoutes from "../services/endpoints/userRoutes"





export const signup = async (Registerdata) =>{
    try {
        let response = await axiosApi.post(userRoutes.register, Registerdata)
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const login = async (email, password) =>{
    try {

        let data = { email ,password}
        let response = await axiosApi.post(userRoutes.login ,data)
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}
export const add_address = async (userData) =>{
    try {

        let response = await axiosApi.put(userRoutes.add_address, userData)
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}
export const saveProfilepic = async (userId,imageUrl) =>{
    try {
        let response = await axiosApi.patch(userRoutes.profileupdate,{userId,imageUrl})
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const Logout = async () =>{
    try {
        let response = await axiosApi.post(userRoutes.logout)
        console.log('response from backend',response);
        return response
    } catch (error) {
        console.log(error);
    }
}