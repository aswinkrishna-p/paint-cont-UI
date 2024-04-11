import { axiosApi } from "../services/api"
import userRoutes from "../services/endpoints/userRoutes"





export const signup = async (Registerdata) =>{
    try {
        let response = await axiosApi.post(userRoutes.register, Registerdata)
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        
    }
}