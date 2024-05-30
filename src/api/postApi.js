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

export const reportPost = async (postId) =>{
    try {
        let response = await axiosApi.post(postRoutes.reportPost,{postId})
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}