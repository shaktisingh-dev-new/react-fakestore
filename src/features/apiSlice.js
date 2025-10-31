import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'fakestoreApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  tagTypes: ['Products'],
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Products', id })),
              { type: 'Products', id: 'LIST' }
            ]
          : [{ type: 'Products', id: 'LIST' }]
    }),
    getProduct: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }]
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: patch
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Products', id },
        { type: 'Products', id: 'LIST' }
      ]
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({ url: `/products/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) => [
        { type: 'Products', id },
        { type: 'Products', id: 'LIST' }
      ]
    })
  })
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation
} = apiSlice
