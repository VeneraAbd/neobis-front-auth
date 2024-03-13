// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import moment from "moment";

// const initialState = {
//   currentUser: undefined,
//   isLoading: false,
// };

// const instance = axios.create({
//   baseURL: "https://kunasyl-backender.org.kg",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// let refresh = false;

// instance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   extraReducers: (builder) => {
//     builder
//       .addCase(register.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.currentUser = action.payload;
//       })
//       .addCase(register.rejected, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(login.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.currentUser = action.payload;
//       })
//       .addCase(login.rejected, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(getCurrentUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getCurrentUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.currentUser = action.payload;
//       })
//       .addCase(getCurrentUser.rejected, (state) => {
//         state.isLoading = false;
//         state.currentUser = null;
//       })
//       .addCase(logout.fulfilled, (state) => {
//         state.isLoading = false;
//         state.currentUser = null;
//       });
//   },
// });

// export const register = createAsyncThunk(
//   "auth/register",
//   async ({ email, username, password }, thunkAPI) => {
//     try {
//       const response = await instance.post("/register/", {
//         email,
//         username,
//         password,
//       });
//       return response;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data.errors);
//     }
//   }
// );

// export const login = createAsyncThunk(
//   "auth/login",
//   async ({ username, password }, thunkAPI) => {
//     try {
//       const response = await instance.post("/login/", {
//         username,
//         password,
//       });
//       localStorage.setItem("refreshToken", response.data.tokens.refresh);
//       localStorage.setItem("accessToken", response.data.tokens.access);
//       return response.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data.errors);
//     }
//   }
// );

// export const getCurrentUser = createAsyncThunk(
//   "auth/getCurrentUser",
//   async (_, thunkAPI) => {
//     try {
//       const token = localStorage.getItem("accessToken") ?? "";
//       let response;
//       const decodedToken = jwtDecode(token);
//       if (decodedToken.exp && decodedToken.exp - moment().unix() < 10) {
//         const refreshToken = localStorage.getItem("refreshToken") ?? "";
//         const refreshResponse = await instance.post("/token/refresh/", {
//           refresh: refreshToken,
//         });
//         console.log(refreshResponse, "refreshResponse")
//         const newAccessToken = refreshResponse.data.access;
//         localStorage.setItem("accessToken", newAccessToken);
//         // response = await instance.get("/token/refresh/");
//       } else {
//         // response = await instance.get("/token/refresh/");
//       }
//       return response.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data.errors);
//     }
//   }
// );

// export const logout = createAsyncThunk(
//     "auth/logout", 
//     async (_, thunkAPI) => {
//         try{
//             const refreshToken = localStorage.getItem("refreshToken");
//             const response = await instance.post("/logout/", {
//                 refreshToken
//             });
//             localStorage.removeItem("accessToken");
//             localStorage.removeItem("refreshToken");
//         }catch(err){

//         }
  
// });

// export default authSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import moment from "moment";


const initialState = {
  currentUser: undefined,
  isLoading: false,
};



export const register = createAsyncThunk(
  "auth/register",
  async ({ email, username, password }, thunkAPI) => {
    try {
      const response = await axios.post("https://kunasyl-backender.org.kg/register/", {
        email, username, password
      });
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://kunasyl-backender.org.kg/login/",
        {
          username, password
        }
      );
      console.log(response.data.tokens.access);
        localStorage.setItem("refreshToken", response.data.tokens.refresh);
        localStorage.setItem("accessToken", response.data.tokens.access)
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken") ?? "";
      let response;
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp && decodedToken.exp - moment().unix() < 10) {
        // Access token needs refreshing
        const refreshToken = localStorage.getItem("refreshToken") ?? "";
        // console.log(refreshToken, "refresh token, line55")
        const refreshResponse = await axios.post("https://kunasyl-backender.org.kg/token/refresh/", {
          refresh: refreshToken
        });
        const newAccessToken = refreshResponse.data.access;
        console.log(newAccessToken, "acces token, line 61")
        localStorage.setItem("accessToken", newAccessToken);
      } else {
        
      }
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", 
     async ({refreshToken}, thunkAPI) => {
        try{
            const response = await axios.post("https://kunasyl-backender.org.kg/logout/", {
            refresh: refreshToken
            });
            return response;
        }catch(err){
            console.error("Logout failed:", err);
            throw err; 
        }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.currentUser = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.currentUser = null;
      });
  },
});

export default authSlice.reducer;


// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   currentUser: undefined,
//   isLoading: false,
// };

// export const register = createAsyncThunk(
//   "auth/register",
//   async ({email, username, password}, thunkAPI) => {
//     try {
//       const response = await axios.post("https://kunasyl-backender.org.kg/register/", {
//        email, username, password
//       });
//       return response;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data.errors);
//     }
//   }
// );

// export const login = createAsyncThunk(
//   "auth/login",
//   async ({username, password}, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         "https://kunasyl-backender.org.kg/login/",
//         {
//           username, password
//         }
//       );
//     console.log(response.data.tokens.access);
    
//       return response.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data.errors);
//     }
//   }
// );

// export const getCurrentUser = createAsyncThunk(
//   "auth/getCurrentUser",
//   async (_, thunkAPI) => {
//     try {
      
//         const token = localStorage.getItem("accessToken") ?? "";
//         const response = await axios.get("https://kunasyl-backender.org.kg/token/refresh/", {
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//       });
//       return response.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data.errors);
//     }
//   }
// );

// export const logout = createAsyncThunk("auth/logout", async () => {
//   localStorage.removeItem("accessToken");
// });

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   extraReducers: (builder) => {
//     builder
//       .addCase(register.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.currentUser = action.payload;
//       })
//       .addCase(register.rejected, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(login.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.currentUser = action.payload;
//       })
//       .addCase(login.rejected, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(getCurrentUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getCurrentUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.currentUser = action.payload;
//       })
//       .addCase(getCurrentUser.rejected, (state) => {
//         state.isLoading = false;
//         state.currentUser = null;
//       })
//       .addCase(logout.fulfilled, (state) => {
//         state.isLoading = false;
//         state.currentUser = null;
//       });
//   },
// });

// export default authSlice.reducer;