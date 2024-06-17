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
        console.log('inside otp verify front');
        let data = { email ,otp}
        let response = await axiosApi.post(painterRoutes.otp ,data)
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}
export const resendOTP = async (email) =>{
    try {
        console.log('inside otp verify front');
        let data = { email}
        let response = await axiosApi.post(painterRoutes.resendOTP ,data)
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const saveProfilepic = async (userId,imageUrl) =>{
    try {
        let response = await axiosApi.patch(painterRoutes.profilepic,{userId,imageUrl})
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const uploadPost = async (data) =>{
    try {
        let response = await axiosApi.post(painterRoutes.createpost,data)
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const updateDetails = async (painterId,details) =>{
    try {
        let response = await axiosApi.post(painterRoutes.updateDetails,{painterId,details})
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const getPainter = async (painterId) =>{
    try {
        let response = await axiosApi.get(`${painterRoutes.getPainter}/${painterId}`)
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const followPainter = async (data) =>{
    try {
        let response = await axiosApi.post(painterRoutes.follow,data)
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const createSlot = async (painterId , data) =>{
    try {
        let response = await axiosApi.post(`${painterRoutes.createSlot}/${painterId}`,data)
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const getFollowers = async (painterId) =>{
    try {
        let response = await axiosApi.get(`${painterRoutes.followers}/${painterId}`)
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}


export const Logout = async () =>{
    try {
        let response = await axiosApi.post(painterRoutes.logout)
        console.log('response from backend',response);
        return response
    } catch (error) {
        console.log(error);
    }
}