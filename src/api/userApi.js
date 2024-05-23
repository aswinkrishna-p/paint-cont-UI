import { axiosApi } from "../services/api"
import userRoutes from "../services/endpoints/userRoutes"





export const signup = async (Registerdata) =>{
    try {
        let response = await axiosApi.post(userRoutes.register, Registerdata)
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const login = async (email, password) => {
    try {
      let data = { email, password };
      let response = await axiosApi.post(userRoutes.login, data);
      console.log('response from backend', response);
      return response;
    } catch (error) {
      console.error('Error in login:', error);
      if (error.response) {
        return error.response;
      }
      return {
        data: {
          success: false,
          message: "An error occurred. Please try again later."
        }
      };
    }
  };
export const add_address = async (userData) =>{
    try {

        let response = await axiosApi.put(userRoutes.add_address, userData)
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
        let response = await axiosApi.post(userRoutes.userotp ,data)
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
        let response = await axiosApi.post(userRoutes.resendotp ,data)
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const saveProfilepic = async (userId,imageUrl) =>{
    try {
        let response = await axiosApi.patch(userRoutes.profileupdate,{userId,imageUrl})
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}
export const getAllPosts = async () =>{
    try {
        let response = await axiosApi.get(userRoutes.getPosts)
        console.log('response from backend' ,response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const Logout = async () =>{
    try {
        let response = await axiosApi.post(userRoutes.logout)
        console.log('response from backend',response);
        return response
    } catch (error) {
        console.log(error);
    }
}