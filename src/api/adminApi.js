import { axiosApi } from "../services/api";
import adminRoutes from "../services/endpoints/adminRoutes";



export const adminLogin = async (username ,password) =>{

    try {
        let data = {username, password}
        console.log(data,'data in the api');
        let response = await axiosApi.post(adminRoutes.login,data)
        console.log('response from backend',response);
        return response
    } catch (error) {
        console.log(error);
    }
}


export const adminlogout = async () =>{
    try {
        const response = await axiosApi.post(adminRoutes.logout)
        console.log('response from backend',response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const getUsers = async () =>{
    try {
        const response = await axiosApi.get(adminRoutes.getUsers)
        // console.log('response from backend',response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const getPainters = async () =>{
    try {
        const response = await axiosApi.get(adminRoutes.getPainters)
        console.log('response from backend',response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const BlockUser = async (userId) =>{
    try {
        const response = await axiosApi.patch(`${adminRoutes.BlockUser}/${userId}`)
        console.log('response from backend',response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const BlockPainter = async (painterId) =>{
    try {
        const response = await axiosApi.patch(`${adminRoutes.BlockPainter}/${painterId}`)
        console.log('response from backend',response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const deletePosts = async (postId) =>{
    try {
        const response = await axiosApi.delete(`${adminRoutes.deletePosts}/${postId}`)
        console.log('response from backend',response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const GetDeletePosts = async (painterId) =>{
    try {
        const response = await axiosApi.get(adminRoutes.getPosts)
        console.log('response from backend',response);
        return response
    } catch (error) {
        console.log(error);
    }
}