import baseApi from "../../api/baseApi";

const dealsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
   

    // Get All
    addDeals: builder.mutation({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      i: ['Profile'], 
    }),
    
   
   
  }),
  overrideExisting: false,
  
});

export const {
   useGetGetProfileQuery,
 

 // Export the update mutation hook
} = dealsApi;

export default dealsApi;
