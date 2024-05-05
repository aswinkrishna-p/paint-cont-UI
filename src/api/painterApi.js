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

export const login = async (email, password) =>{
    try {

        let data = { email ,password}
        let response = await axiosApi.post(painterRoutes.login ,data)
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}
export const otpVerification = async (email, otp) =>{
    try {

        let data = { email ,otp}
        let response = await axiosApi.post(painterRoutes.otp ,data)
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}