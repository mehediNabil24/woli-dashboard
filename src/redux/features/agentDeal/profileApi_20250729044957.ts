import baseApi from "../../api/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
   

    // Get All
    getGetProfile: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ['Profile'], 
    }),

   

    // Update Category API (PATCH)
    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/users/update-me", // Adjust your actual update endpoint
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Profile'], // Invalidate the 'Categories' tag to refetch data
    }),
  }),
  overrideExisting: false,
  
});

export const {
   useGetGetProfileQuery,
   useUpdateProfileMutation

 // Export the update mutation hook
} = profileApi;

export default profileApi;
