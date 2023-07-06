import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getTodos = createAsyncThunk(
  "getTodos",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3001/todos");
      console.log("response", response.data);

      // toolkit에서 제공하는 API
      // Promise -> resolve(= network 요청이 성공한 경우) -> dispatch 해주는 기능을 가진 API
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error", error);

      // toolkit에서 제공하는 API
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    [__getTodos.pending]: (state, action) => {
      // 아직 진행 중일 때
      state.isLoading = true;
      state.isError = false;
    },
    [__getTodos.fulfilled]: (state, action) => {
      // console.log("fulfilled : ", action);
      state.isLoading = false;
      state.isError = false;
      state.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
