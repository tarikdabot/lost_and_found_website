import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import lostReducer from './lost/Lost.js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Storage object for localStorage
import themeReducer from './theme/themeSlice';
import userReducer from './user/userSlice'; // Correct import for the user reducer
// import foundReducer from '../post/found/Found';
 

const rootReducer = combineReducers({
  // lost:lostReducer,
  user: userReducer,
  theme: themeReducer,
  // found:foundReducer,
 
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
