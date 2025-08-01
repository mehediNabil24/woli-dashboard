import baseApi from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  

    // add company 
    addCompany: builder.mutation({
      query: (body) => ({
        url: `/companies/`, // Adjust your actual add endpoint
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'], // Invalidate the 'Product' tag to refetch data
    }),

    // add product
    addProduct: builder.mutation({
      query: (body) => ({
        url: `/products/`, // Adjust your actual add endpoint
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'], // Invalidate the 'Product' tag to refetch data
    }),
   

    // Get All company API
    getCompany: builder.query({
      query: ({page,limit}) => ({
        url: "/companies",
        method: "GET",
        params: {
          page: String(page),   // Ensure it's a string
          limit: String(limit), // Ensure it's a string
        },
      }),
      providesTags: ['Product'], 
    }),

    //update company api
    updateCompany: builder.mutation({
      query: ({body,id}) => ({
        url: `/companies/${id}`, // Adjust your actual update endpoint
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Product'], // Invalidate the 'Product' tag to refetch data
    }),

    // get all product 
    getProduct: builder.query({
      query: ({page,limit,searchTerm}) => ({
        url: "/products",
        method: "GET",
         params: {
      searchTerm,
      page: String(page),   // Ensure it's a string
      limit: String(limit), // Ensure it's a string
    },
      }),
      providesTags: ['Product'], 
    }),

   

    // Update Category API (PATCH)
    updateProduct: builder.mutation({
      query: ({body,id}) => ({
        url: `/products/${id}`, // Adjust your actual update endpoint
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Product'], // Invalidate the 'Categories' tag to refetch data
    }),

    // Delete Product API
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`, // Adjust your actual delete endpoint
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'], // Invalidate the 'Product' tag to refetch data
    }),
  }),
  overrideExisting: false,
  
});

export const {
   useAddCompanyMutation,
   useAddProductMutation,
   useGetCompanyQuery,
   useGetProductQuery,
    useUpdateProductMutation, 
    useUpdateCompanyMutation,
    useDeleteProductMutation// Export the update mutation hook

 // Export the update mutation hook
} = productApi;

export default productApi;
