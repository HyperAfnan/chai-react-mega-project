import { createSlice } from "@reduxjs/toolkit";
const initialState = { posts: [] };

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    createPost: (state, action) => {
      state.posts = action.payload;
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.$id !== action.payload);
    },
    editPost: (state, action) => {
      const updatedData = action.payload;
      const postIndex = state.posts.findIndex(
        (post) => post.$id === updatedData.$id,
      );
      if (postIndex !== -1) {
        state.posts[postIndex] = {
          ...state.posts[postIndex],
          ...updatedData,
        };
      }
    },
  },
});

export const { createPost, deletePost, editPost } = postSlice.actions;
export default postSlice.reducer;
