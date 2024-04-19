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