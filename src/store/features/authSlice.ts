import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios, { AxiosResponse } from "axios";
// const api: string = "http://localhost:8001";

const api: string = "https://sportfy.onrender.com";

interface AuthState {
  isLoading: boolean;
  user: any | null;
  error: string | null;
  erros: string | null;
  token: string | null;
  status: boolean;
  isLogin: boolean;
  messageForgetPassword: string | null;
  errorLogin: string|null;
  message: string | null;
}

// Initial state
const initialState: AuthState = {
  isLoading: false,
  user: null,
  error: null,
  erros: null,
  token: null,
  status: false,
  isLogin: false,
  messageForgetPassword: null,
  message: null,
  errorLogin: null,
};

// Create async thunk for registering a user
export const registers = createAsyncThunk(
  "auth/register",
  async (data: any, thunkAPI) => {
    console.log("===========");

    console.log("Data ", data);
    console.log("===========");

    try {
      const res: AxiosResponse = await axios.post(
        api + "/api/v1/auth/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from API:", res.data);

      return res.data;
    } catch (error: any) {
      console.error(
        "Error while registering:",
        error.response?.data || error.message
      );

      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (data: any, thunkAPI) => {
    console.log("===========");

    console.log("Data ", data);
    console.log("===========");
    console.log("Data being sent to API:", data);
    console.log(api);

    try {
      const res: AxiosResponse = await axios.post(
        `${api}/api/v1/auth/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from API:", res.data);

      return res.data;
    } catch (error: any) {
      console.error(
        "Error while registering:",
        error.response?.data || error.message
      );

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data, thunkAPI: any) => {
    const state = thunkAPI.getState().auth;
    console.log(state);

    console.log("Data being sent to API:", data);
    console.log("Current token:", state.token);

    try {
      const res = await axios.post(
        `http://localhost:8001/api/auth/verifyAcount/${state.token}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from API:", res.data);

      return res.data;
    } catch (error: any) {
      console.error(
        "Error while verifying OTP:",
        error.response?.data || error.message
      );

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(
        `http://localhost:8001/api/auth//forgetpassword`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from API:", res);

      return res.data;
    } catch (error: any) {
      console.error(
        "Error while verifying OTP:",
        error.response?.data || error.message
      );

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const UpdatePassword = createAsyncThunk(
  "auth/UpdatePassword",
  async (data, thunkAPI: any) => {
    console.log(data);

    const state = thunkAPI.getState().auth;

    try {
      const res = await axios.post(
        `http://localhost:8001/api/auth/resetpassword/${state.token}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;
    } catch (error: any) {
      console.error(error.response?.data || error.message);

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const Deconxion = createAsyncThunk(
  "auth/Deconxion",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`http://localhost:8001/api/auth/logout`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error: any) {
      console.error(error.response?.data || error.message);

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const isLogins = createAsyncThunk(
  "auth/isLogins",
  async (token: string, thunkAPI: any) => {
    try {
      const res = await axios.get(`${api}/api/v1/auth/islogin/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response from API:", res.data);

      return res.data;
    } catch (error: any) {
      console.error(
        "Error while verifying login:",
        error.response?.data || error.message
      );

      return thunkAPI.rejectWithValue(error.response?.data || error.message); // Pass specific error message
    }
  }
);

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registers.pending, (state) => {
        console.log("is pending");
        state.isLoading = true;
        state.error = null;
        state.status = false;
      })
      .addCase(registers.fulfilled, (state, action: any) => {
        console.log("is fulfilled");
        state.isLoading = false;
        state.user = action.payload;
        console.log("User registered successfully:", action.payload);
        state.isLogin = true;
        state.token = action.payload.token;
        state.error = null;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registers.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload.response.data.errors;
        state.status = false;
      });

    // login user
    builder
      .addCase(login.pending, (state) => {
        console.log("is pending");
        state.isLoading = true;
        state.status = false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: any) => {
        console.log("is fulfilled");
        state.isLoading = false;
        state.user = action.payload;
        console.log("User logged in successfully:", action.payload);
        state.token = action.payload.token;
        state.error = null;
        state.status = true;
        localStorage.setItem("token", action.payload.token);
        console.log(state.token);
      })
      .addCase(login.rejected, (state, action: any) => {
        console.log(action.payload.response.data.message);
        state.isLoading = false;
        state.errorLogin = action.payload.response.data.message;
        state.status = false;
        console.log(action.payload);
      });

    // verifyOtp
    builder
      .addCase(verifyOtp.pending, (state) => {
        console.log("is pending");
        state.isLoading = true;
        console.log(state.token);
        state.status = false;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        console.log("is fulfilled");
        state.isLoading = false;
        state.user = action.payload;
        console.log("User logged in successfully:", action.payload);
        state.token = action.payload.token;
        state.error = null;
        console.log(state.token);
      })
      .addCase(verifyOtp.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload.response.data.errors;
        state.status = false;
      });

    // Forget Password
    builder
      .addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
        state.status = false;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.user = action.payload;
        console.log("User Action", action);
        state.token = action.payload.token;
        state.error = null;
        state.status = true;
      })
      .addCase(forgetPassword.rejected, (state, action: any) => {
        state.status = false;
        state.isLoading = false;
        console.log(action.payload.response.data.message);

        state.messageForgetPassword = action.payload.response.data.message;
      });

    // UpdatePassword
    builder
      .addCase(UpdatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = false;
      })
      .addCase(UpdatePassword.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.error = null;
        state.status = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(UpdatePassword.rejected, (state, action: any) => {
        state.status = false;

        state.isLoading = false;
        console.log(action.payload.response.data.message);

        state.error = action.payload.response.data.message;
      });

    // log out
    builder
      .addCase(Deconxion.pending, (state) => {
        state.isLoading = true;
        state.status = false;
        state.isLogin = false;
        state.error = null;
      })
      .addCase(Deconxion.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token;
        state.error = null;
        state.status = true;
        state.isLogin = false;
        state.error = null;
      })
      .addCase(Deconxion.rejected, (state, action: any) => {
        state.status = false;
        state.isLogin = false;

        state.isLoading = false;
        console.log(action.payload.response.data.message);

        state.error = action.payload.response.data.message;
      });

    builder
      .addCase(isLogins.pending, (state) => {
        state.error = null;
      })
      .addCase(isLogins.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        state.isLogin = true;
        state.error = null;
      })
      .addCase(isLogins.rejected, (state, action: any) => {
        state.isLoading = false;
        console.log(action.payload.response);

        state.error = action.payload.response.data.message;
      });
  },
});

export default authSlice.reducer;
