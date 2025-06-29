// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   currentUser: null,
//   error: null,
//   loading: false,
// };
// // 
// const lostSlice = createSlice({
//   name: 'lost',
//   initialState,
//   reducers: {
//     lostStart: (state) => {
//       state.loading = true;
//       state.error = null; // Clear any previous errors when starting a new sign-in attempt
//     },
//     lostSuccess: (state, action) => {
//       state.currentUser = action.payload;
//       state.loading = false;
//       state.error = null; // No error on success
//     },
//     lostFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload; // Set error message on failure
//     },
//     clearError: (state) => {
//       state.error = null; // Clear the error state
//     },
//   },
// });

// export const { lostStart, lostSuccess, lostFailure,   clearError } = lostSlice.actions;
// export default lostSlice.reducer;

