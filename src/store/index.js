import { configureStore } from '@reduxjs/toolkit'

import { articlesApi } from '../api/articlesApi'
import { userApi } from '../api/userApi'

import userSlice from './userSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(articlesApi.middleware).concat(userApi.middleware),
})

export default store
