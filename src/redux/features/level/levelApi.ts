import baseApi from "../../api/baseApi";

const levelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
   
    // Add Level API

    addLevel: builder.mutation({
      query: (body) => ({
        url: `/levels/`, // Adjust your actual add endpoint
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Level'], // Invalidate the 'Level' tag to refetch data
    }),

    // Get All
    getProfile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: ['Profile'], 
    }),

   

    // Update Category API (PATCH)
    updateProfile: builder.mutation({
      query: (body) => ({
        url: `/user/update-profile/`, // Adjust your actual update endpoint
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Profile'], // Invalidate the 'Categories' tag to refetch data
    }),
  }),
  overrideExisting: false,
  
});

export const {
   useAddLevelMutation

 // Export the update mutation hook
} = levelApi;

export default levelApi;
