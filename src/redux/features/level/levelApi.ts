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

    // Get All level api
    getLevel: builder.query({
      query: ({page,limit}) => ({
        url: "/levels",
        method: "GET",
        params: { page:String(page), limit:String(limit) }, // Include pagination parameters
      }),
      providesTags: ['Level'], 
    }),

   

    // Update Category API (PATCH)
    updateLevel: builder.mutation({
      query: ({body,id}) => ({
        url: `/levels/${id}`, // Adjust your actual update endpoint
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Level'], // Invalidate the 'Categories' tag to refetch data
    }),
  }),
  overrideExisting: false,
  
});

export const {
   useAddLevelMutation,
   useGetLevelQuery,
    useUpdateLevelMutation,

 // Export the update mutation hook
} = levelApi;

export default levelApi;
