import baseApi from "../../api/baseApi";

const dealsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
   

    // Get All
    getGetProfile: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ['Profile'], 
    }),
    
   
   
  }),
  overrideExisting: false,
  
});

export const {
   useGetGetProfileQuery,
   useUpdateProfileMutation

 // Export the update mutation hook
} = dealsApi;

export default dealsApi;
