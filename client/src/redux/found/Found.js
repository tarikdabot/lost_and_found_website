// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   currentUser: null,
//   error: null,
//   loading: false,
// };

// const foundSlice = createSlice({
//   name: 'found',
//   initialState,
//   reducers: {
//     foundStart: (state) => {
//       state.loading = true;
//       state.error = null; // Clear any previous errors when starting a new sign-in attempt
//     },
//     foundSuccess: (state, action) => {
//       state.currentUser = action.payload;
//       state.loading = false;
//       state.error = null; // No error on success
//     },
//     foundFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload; // Set error message on failure
//     },
//     clearError: (state) => {
//       state.error = null; // Clear the error state
//     },
//   },
// });

// export const { foundStart, foundSuccess, foundFailure,   clearError } = foundSlice.actions;
// export default foundSlice.reducer;

