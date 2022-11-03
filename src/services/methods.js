import { constants } from "../utils/constants";


const axios = require("axios").default;

export const Apicall = async (url, method, headers = {}, data = {}) => {
    try {
        const response = await axios({
            method,
            url,
            headers,
            data,
        });
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 201) {
            return response.data;
        } else if (response.status === 204) {
            return response.data;
        }
        else {
            return response.data;
        }
    } catch (error) {
        
        if(error.response.data.message==='invalid token' || error.response.data.message==='You are not logged in! Please log in to get access.'|| error.response.data.message==='The user belonging to this token does no longer exist.'){
            
            localStorage.clear();
            window.location.href = constants.FRONTEND_URL
            
        } 
        else if(error.response.data){
            return error.response.data;
        }
        else{
            return error;
        }
        
    }
};
