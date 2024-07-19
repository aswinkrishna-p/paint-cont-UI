import { axiosApi } from "../services/api";
import messageRoutes from "../services/endpoints/messageRoutes";



export const  createConversation = async(data) => {
    try {
        let response = await axiosApi.post(messageRoutes.createConversation, data)
        console.log('response from backend create conversation' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const  getConversationByUserId = async(userId) => {
    try {
        let response = await axiosApi.get(`${messageRoutes.getConversationByUserId}/${userId}` )
        console.log('response from backend conversation by userid' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const  getMessageByconvId = async(conversationId) => {
    try {
        let response = await axiosApi.get(`${messageRoutes.getMessageByConvId}/${conversationId}` )
        console.log('response from backend getmessage by convid' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}

// no backend call made
export const  getMessages = async(data) => {
    try {
        let response = await axiosApi.post(messageRoutes.getMessages, data)
        console.log('response from backend getMessages' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const  createMessage = async(obj) => {
    try {
        let response = await axiosApi.post(messageRoutes.createMessage, obj)
        console.log('response from backend create message' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}