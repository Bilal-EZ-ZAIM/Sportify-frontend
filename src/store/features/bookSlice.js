import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  isLoading: false,
  books: [],
  error: null,
};

// Fetch books
export const getData = createAsyncThunk("book/getData", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:5000/book");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Insert a new book
export const insertData = createAsyncThunk(
  "book/insertData",
  async (bookData, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:5000/book", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete a book
export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (id, thunkAPI) => {
    try {
      await fetch(`http://localhost:5000/book/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update a book
export const updateBook = createAsyncThunk(
  "book/updateBook",
  async ({ id, updatedBook }, thunkAPI) => {
    console.log(updatedBook);
    console.log("id = " + id);
    try {
      const res = await fetch(`http://localhost:5000/book/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedBook),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create the slice
const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch books
      .addCase(getData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload.Books;
      })
      .addCase(getData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Insert a new book
      .addCase(insertData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(insertData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books.unshift(action.payload.data);
      })
      .addCase(insertData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete a book
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = state.books.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update a book
      .addCase(updateBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.books.findIndex(
          (book) => book._id === action.payload._id
        );
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
