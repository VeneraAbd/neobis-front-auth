import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import moment from "moment";

export const setEmail = createAction('auth/setEmail');

const instance = axios.create({
  baseURL: "https://kunasyl-backender.org.kg",
  headers: {
    "Content-Type": "application/json",
  },
});


instance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken") ?? "";
        const refreshResponse = await axios.post("https://kunasyl-backender.org.kg/token/refresh/", {
          refresh: refreshToken
        });
        const newAccessToken = refreshResponse.data.access;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

const initialState = {
  currentUser: undefined,
  isLoading: false,
  email: null,
};


export const register = createAsyncThunk(
  "auth/register",
  async ({ email, username, password, password_confirm }, thunkAPI) => {
    try {
      const response = await axios.post("https://kunasyl-backender.org.kg/register/", {
        email, username, password, password_confirm
      });
      thunkAPI.dispatch(setEmail(email));
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

        localStorage.setItem("refreshToken", response.data.tokens.refresh);
        localStorage.setItem("accessToken", response.data.tokens.access);

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
        
        const refreshToken = localStorage.getItem("refreshToken") ?? "";
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
      })
      .addCase(setEmail, (state, action) => {
        state.email = action.payload;
      });
  },
});

export default authSlice.reducer;