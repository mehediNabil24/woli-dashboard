import baseApi from "../../api/baseApi";

const agentDealApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
   

    // Get All
    getReport: builder.query({
      query: ({searchTerm, page,limit}) => ({
        url: "/deals/get-my-deals",
        method: "GET",
        params:{
            searchTerm,
            page: String(page),   // Ensure it's a string
            limit: String(limit), // Ensure it's a string
        }
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
   useGetReportQuery
   

 // Export the update mutation hook
} = agentDealApi;

export default agentDealApi;
