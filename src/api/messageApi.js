import { axiosApi } from "../services/api";
import messageRoutes from "../services/endpoints/messageRoutes";



export const  createConversation = async() => {
    try {
        let response = await axiosApi.post(messageRoutes.createConversation, )
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}