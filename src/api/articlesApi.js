import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { apiBase } from '../constants/constants'

const token = localStorage.getItem('token')

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  tagTypes: ['Articles'],
  baseQuery: fetchBaseQuery({ baseUrl: apiBase }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (offset) => `articles?limit=10&${offset && `offset=${offset}`}`,
      method: 'GET',
      headers: {
        Authorization: token ? `Token ${token}` : undefined,
      },
    }),
    getArticleBySlug: builder.query({
      query: (slug) => `articles/${slug}`,
      headers: {
        Authorization: token ? `Token ${token}` : undefined,
      },
    }),
  }),
})

export const { useGetArticleBySlugQuery, useGetArticlesQuery } = articlesApi
