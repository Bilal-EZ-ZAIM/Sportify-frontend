import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios, { AxiosResponse } from "axios";

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
      const token: any = localStorage.getItem("token");
      const res: AxiosResponse = await axios.post(
        "http://localhost:8001/api/v1/manager/event/create",
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

// Create async thunk for registering a user
export const getEvents = createAsyncThunk(
  "event/getEvents",
  async (data: any, thunkAPI) => {
    try {
      const token: any = localStorage.getItem("token");
      const res: AxiosResponse = await axios.get(
        `http://localhost:8001/api/v1/manager/event?page=${data.page}&limit=${data.limit}`,
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
        state.count += 1;
        console.log("User registered successfully:", action.payload);
      })
      .addCase(createEvent.rejected, (state, action: any) => {
        state.isLoading = false;
        state.status = false;
      });

    builder
      // getEvents
      .addCase(getEvents.pending, (state) => {
        console.log("is pending");
        state.isLoading = true;
        state.status = false;
      })
      .addCase(getEvents.fulfilled, (state, action: any) => {
        console.log("is fulfilled");
        state.isLoading = false;
        console.log("Get events", action.payload);
        state.events = action.payload;
      })
      .addCase(getEvents.rejected, (state, action: any) => {
        state.isLoading = false;
        state.status = false;
      });
  },
});

export default eventSlice.reducer;
