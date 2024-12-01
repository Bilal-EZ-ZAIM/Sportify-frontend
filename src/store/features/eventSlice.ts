import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios, { AxiosResponse } from "axios";
const api: string = "http://localhost:8001";

// const api: string = "https://sportfy.onrender.com";

interface EventState {
  isLoading: boolean;
  erros: string | null;
  status: boolean;
  events: any;
  count: number;
}

// Initial state
const initialState: EventState = {
  isLoading: false,
  erros: null,
  status: false,
  events: null,
  count: 0,
};

// Create async thunk for create a events
export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (data: any, thunkAPI) => {
    try {
      console.log(data);

      const token: any = localStorage.getItem("token");
      const res: AxiosResponse = await axios.post(
        api + "/api/v1/manager/event/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
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

// Create async thunk for registering a user
export const getEvents = createAsyncThunk(
  "event/getEvents",
  async (data: any, thunkAPI) => {
    try {
      const token: any = localStorage.getItem("token");
      const res: AxiosResponse = await axios.get(
        `${api}/api/v1/manager/event?page=${data.page}&limit=${data.limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response from API: event", res.data);

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

export const updateEvent = createAsyncThunk(
  "event/updateEvent",
  async (data: any, thunkAPI) => {
    try {
      const token: any = localStorage.getItem("token");
      const res: AxiosResponse = await axios.put(
        `${api}/api/v1/manager/event/update/${data.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async (id: string, thunkAPI) => {
    try {
      const token: any = localStorage.getItem("token");
      const res: AxiosResponse = await axios.delete(
        `${api}/api/v1/manager/event/delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
// Create the slice
const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createEvent
      .addCase(createEvent.pending, (state) => {
        console.log("is pending");
        state.isLoading = true;
        state.status = false;
      })
      .addCase(createEvent.fulfilled, (state, action: any) => {
        console.log("is fulfilled");
        state.isLoading = false;
        state.status = true;
        state.count += 1;
        console.log("User registered successfully:", action.payload);
      })
      .addCase(createEvent.rejected, (state, action: any) => {
        state.isLoading = false;
        state.status = false;
        state.erros = action.payload.response.data.errors;
      });

    builder
      // getEvents
      .addCase(getEvents.pending, (state) => {
        console.log("is pending");
        state.isLoading = true;
      })
      .addCase(getEvents.fulfilled, (state, action: any) => {
        console.log("is fulfilled");
        state.isLoading = false;
        console.log("Get events", action.payload);
        state.events = action.payload;
      })
      .addCase(getEvents.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      // deleteEvent
      .addCase(deleteEvent.pending, (state) => {
        console.log("is pending");
        state.isLoading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.count += 1;
        console.log("User registered successfully:", action.payload);
      })
      .addCase(deleteEvent.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      // updateEvent
      .addCase(updateEvent.pending, (state) => {
        console.log("is pending");
        state.isLoading = true;
        state.status = false;
      })
      .addCase(updateEvent.fulfilled, (state, action: any) => {
        console.log("is fulfilled");
        state.isLoading = false;
        state.count += 1;
        console.log("User registered successfully:", action.payload);
      })
      .addCase(updateEvent.rejected, (state) => {
        state.isLoading = false;
        state.status = false;
      });
  },
});

export default eventSlice.reducer;
