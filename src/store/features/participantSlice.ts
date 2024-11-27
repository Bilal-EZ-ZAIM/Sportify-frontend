import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios, { AxiosResponse } from "axios";

interface EventState {
  isLoading: boolean;
  erros: string | null;
  status: boolean;
  participant: any;
  countparticipant: number;
}

// Initial state
const initialState: EventState = {
  isLoading: false,
  erros: null,
  status: false,
  participant: null,
  countparticipant: 0,
};

// Create async thunk for create a events
export const createParticipant = createAsyncThunk(
  "event/createParticipant",
  async (data: any, thunkAPI) => {
    try {
      const token: any = localStorage.getItem("token");
      const res: AxiosResponse = await axios.post(
        "http://localhost:8001/api/v1/manager/participants/create",
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
export const getParticipants = createAsyncThunk(
  "event/getParticipants",
  async (data: any, thunkAPI) => {
    try {
      const token: any = localStorage.getItem("token");
      const res: AxiosResponse = await axios.get(
        `http://localhost:8001/api/v1/manager/participants`,
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
        `http://localhost:8001/api/v1/manager/event/update/${data.id}`,
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
        `http://localhost:8001/api/v1/manager/event/delete/${id}`,
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
const Participantslice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createParticipant
      .addCase(createParticipant.pending, (state) => {
        console.log("is pending");
        state.isLoading = true;
        state.status = false;
      })
      .addCase(createParticipant.fulfilled, (state, action: any) => {
        console.log("is fulfilled");
        state.isLoading = false;
        state.countparticipant += 1;
        console.log("User registered successfully:", action.payload);
      })
      .addCase(createParticipant.rejected, (state, action: any) => {
        state.isLoading = false;
        state.status = false;
      });

    builder
      // getParticipants
      .addCase(getParticipants.pending, (state) => {
        console.log("is pending");
        state.isLoading = true;
        state.status = false;
      })
      .addCase(getParticipants.fulfilled, (state, action: any) => {
        console.log("is fulfilled");
        state.isLoading = false;
        console.log("Get Participants", action.payload);
        state.participant = action.payload;
      })
      .addCase(getParticipants.rejected, (state, action: any) => {
        state.isLoading = false;
        state.status = false;
      });

    builder
      // deleteEvent
      .addCase(deleteEvent.pending, (state) => {
        console.log("is pending");
        state.isLoading = true;
        state.status = false;
      })
      .addCase(deleteEvent.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.countparticipant += 1;
        console.log("User registered successfully:", action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action: any) => {
        state.isLoading = false;
        state.status = false;
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
        state.countparticipant += 1;
        console.log("User registered successfully:", action.payload);
      })
      .addCase(updateEvent.rejected, (state, action: any) => {
        state.isLoading = false;
        state.status = false;
      });
  },
});

export default Participantslice.reducer;
