import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { apiBase } from '../constants/constants'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiBase }),
  tagTypes: ['UserInfo'],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: ({ email, password, username }) => ({
        url: '/users',
        method: 'POST',
        body: { user: { email, password, username } },
      }),
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: '/users/login',
        method: 'POST',
        body: { user: { email, password } },
      }),
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: '/user',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }),
      providesTags: () => ['UserInfo'],
      invalidatesTags: ['UserInfo'],
    }),
    updateUser: builder.mutation({
      query: (fields) => ({
        url: '/user',
        method: 'PUT',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: { user: fields },
      }),
    }),
    createArticle: builder.mutation({
      query: (article) => ({
        url: '/articles',
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: article,
      }),
    }),
    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      }),
    }),
    editArticle: builder.mutation({
      query: ({ slug, newArticle }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: newArticle,
      }),
    }),
    likeArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      }),
    }),
  }),
})

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useCreateArticleMutation,
  useLikeArticleMutation,
  useDeleteArticleMutation,
  useEditArticleMutation,
} = userApi
