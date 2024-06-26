import { axiosApi } from "../services/api"
import postRoutes from "../services/endpoints/postRoutes";






export const getAllPosts = async () =>{
    try {
        let response = await axiosApi.get(postRoutes.getPosts)
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }

}

export const getPainterPosts = async (painterId) =>{
    try {
        let response = await axiosApi.get(`${postRoutes.getPainterPost}/${painterId}`)
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const updateLike = async (data) =>{
    try {
        let response = await axiosApi.post(postRoutes.updateLike,data)
        console.log('response from backend',response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const addComment = async (data) =>{
    try {
        let response = await axiosApi.post(postRoutes.addComment,data)
        console.log('response from backend',response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const reportPost = async (postId) =>{
    try {
        let response = await axiosApi.post(postRoutes.reportPost,{postId})
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const DeletePost = async (postId) =>{
    try {
        let response = await axiosApi.delete(`${postRoutes.deletePost}/${postId}`)
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}