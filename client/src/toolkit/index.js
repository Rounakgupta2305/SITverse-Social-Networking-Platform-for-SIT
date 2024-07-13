import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  mode: "light", //string which represents the mode of the page
  user: null,    //object which represents the current user
  token: null,   //string which represents auth token
  posts: [],     //array which will hold posts
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  
  reducers: { //state transitions

    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light"; // chnages between light and dark mode
    },

    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token; // set the user and token upon login
    },

    setLogout: (state) => {
      state.user = null;
      state.token = null; // clear the user and token upon logout
    },

    setFriends: (state, action) => { 
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :("); // update the user's friends list
      }
    },

    setPosts: (state, action) => {
      state.posts = action.payload.posts; // set the entire list of posts
    },

    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post; // update a specific post in the list of posts
        return post;
      });
      state.posts = updatedPosts;
    }

  }
});
export const {setMode, setLogin, setLogout, setFriends, setPosts, setPost} = authSlice.actions;
export default authSlice.reducer;