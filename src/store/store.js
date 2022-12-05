import {configureStore} from '@reduxjs/toolkit'

import bookSlice from './bookStore';

const store = configureStore({
  reducer: { bookStore: bookSlice.reducer},
});

export default store;