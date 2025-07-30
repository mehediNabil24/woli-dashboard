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
        url: "/users/update-me", 
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Profile'], 
    }),
  addDocumenment: builder.mutation({
      query: (body) => ({
        url: "/users/update-me", 
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Profile'], 
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
