// src/features/category/categoryApi.ts
import baseApi from "../baseApi"; // Your baseApi instance

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Category API
    addCategory: builder.mutation({
      query: (formData) => ({
        url: "/category/create-category", // The API endpoint to create a category
        method: "POST",
        body: formData, // Form data to be sent
      }),
      invalidatesTags: ['Categories'], // Invalidate the 'Categories' tag to refetch data
    }),

    // Get All Categories API
    getCategories: builder.query({
      query: () => ({
        url: "/category/get-all-categories/admin",
        method: "GET",
      }),
      providesTags: ['Categories'], // Provide the 'Categories' tag for caching
    }),

    // Delete Category API
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/delete-category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'], // Invalidate the 'Categories' tag to refetch data
    }),

    // Update Category API (PATCH)
  // In your API slice
updateCategory: builder.mutation({
  query: ({ id, updatedData, published }) => {
    if (updatedData instanceof FormData) {
      return {
        url: `/category/update-category/${id}?published=${published}`,
        method: 'PATCH',
        body: updatedData,
      };
    } else {
      return {
        url: `/category/update-category/${id}`,
        method: 'PATCH',
        body: {
          ...updatedData,
          published: updatedData.published === true || updatedData.published === 'true'
        },
        headers: {
          'Content-Type': 'application/json'
        }
      };
    }
  },
  invalidatesTags: ['Categories'],
}),

  }),
  overrideExisting: false,
  
});

export const {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation, // Export the update mutation hook
} = categoryApi;

export default categoryApi;
