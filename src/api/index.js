// import axios from 'axios';

// const accessToken = localStorage.getItem("accessToken"); //retrieves the access token from the browser's local storage

// const instance = axios.create({  //The create() method allows you to create a customized instance of Axios with default configuration options.
//     baseURL: "https://kunasyl-backender.org.kg", 
//     headers:{  //The headers object contains the request headers. Here, it sets the Content-Type to application/json and includes the access token in the Authorization header using the Bearer authentication scheme.
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${accessToken}`
//     },
        
// })

// let refresh = false;
// // Axios interceptors are functions that Axios calls for every request and response. They can be used to modify requests or responses before they are sent or received.
// instance.interceptors.response.use( //an interceptor is added to the Axios instance to handle responses. It intercepts any responses and executes the provided callback functions based on whether the response was successful or not
//     (response) => response,         //The interceptor function takes two parameters: (response) and async (error) => { ... }.
//     async (error) => {        //Inside the error callback function, it checks if the response status is 401 (Unauthorized) and if the refresh flag is false.
//         const originalRequest = error.config;
//         const refreshToken = localStorage.getItem('refreshToken');
//         console.log("refresh token", refreshToken);

//         if(error.response.status === 401 && !refresh){ //If both conditions are met, 
//             refresh = true;                           //it sets refresh to true 

//             try{
//                 const response = await instance.post("/token/refresh/",{ //and attempts to refresh the access token by sending a POST request to the /auth/token/refresh/ endpoint with the refresh token.
//                     refresh: refreshToken,
//                 });
//                 if(response.status === 201){ //If the token refresh is successful (status 201), 
//                     const newAccessToken = response.data.tokens.access;  
//                     localStorage.setItem("accessToken", newAccessToken) //it updates the access token in the local storage
//                     console.log("Access Token", newAccessToken);

//                     originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; //modifies the Authorization header of the original request to include the new access token, and re-sends the original request using the instance() method.
//                     return instance(originalRequest);
//                 }
//             }catch(refreshError){ //If the token refresh fails, it logs an error message and throws the error.
//                 console.log("Refresh token failed", refreshError);
//                 throw refreshError;
//             }finally{ //Finally, it sets refresh back to false.
//                 refresh = false;
//             }
//         }

//         return Promise.reject(error) //If the response status is not 401 or if the refresh token request fails, the interceptor rejects the promise, causing the original request to fail with the same error.
//     }
// );

// export const signup = async(data) =>{
//     try{
//         const response = await instance.post("/register/", data);
//         return response.data;
//     }catch(error){
//         console.log(error);
//         throw error;
//     }
// }

// export const login = async(data) =>{
//     try{
//         const response = await instance.post("/login/", data);
//         console.log(response.data.tokens, "looking for the tokens")
//         return response.data;
        
//     }catch(error){
//         console.log(error);
//         throw error;
//     }
// } 

// export const logout = async() => {
//     try {

//         localStorage.removeItem("accessToken");
//         // You can also perform other cleanup tasks here if needed

//         // Redirect the user to the login page after logout
//         // Replace '/login' with the actual path to your login page
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// };