import { createSlice } from '@reduxjs/toolkit'

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articlesData: [],
    articlesCount: 0,
    status: null,
    error: null,
  },
  reducers: {
    addPostList(state, action) {
      state.articlesData = action.payload.articles
      state.articlesCount = action.payload.articlesCount
    },
  },
})

export const { addPostList } = articlesSlice.actions
export default articlesSlice.reducer
