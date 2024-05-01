import { axiosApi } from "../services/api";
import painterRoutes from "../services/endpoints/painterRoutes";



export const signup = async (Registerdata) =>{
    try {
        let response = await axiosApi.post(painterRoutes.register, Registerdata)
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}
