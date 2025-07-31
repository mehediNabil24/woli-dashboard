
import baseApi from "../../api/baseApi";

const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
   

    // Get All agent
    getAgent: builder.query({
      query: ({searchTerm,approvalStatus, page,limit}) => ({
        url: "/users",
        method: "GET",
        params:{
            searchTerm,
            approvalStatus,
            page: String(page),   // Ensure it's a string
            limit: String(limit), // Ensure it's a string
        }
      }),
      providesTags: ['Agent'], 
    }),

    // Get Agent by ID
    getAgentById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ['Agent'],
    }),


    // add agent status
    addAgentStatus: builder.mutation({
      query: (body) => ({
        url: `/users/accept-agent-request`,
        method: "POST",
        body,
      }),
      invalidatesTags: ['Agent'], // Invalidate the 'Agent' tag to refetch data
    }),

    // add agent level 
    addAgentLevel: builder.mutation({
      query: (body) => ({
        url: `/users/add-agent-level`,
        method: "POST",
        body,
      }),
      invalidatesTags: ['Agent'], // Invalidate the 'Agent' tag to refetch data
    }),

    //get all ageent deal requests
    getAgentDealRequest: builder.query({
      query: ({searchTerm, page,limit}) => ({
        url: "/deals?dealStatus=PENDING",
        method: "GET",
        params:{
            searchTerm,
            page: String(page),   // Ensure it's a string
            limit: String(limit), // Ensure it's a string
        }
      }),
      providesTags: ['Agent'], 
    }),

    //update deal status 
    updateDealStatus: builder.mutation({
      query: ({body,id}) => ({
        url: `deals/change-status/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ['Agent'], // Invalidate the 'Agent' tag to refetch data
    }),

    // update deal 
    updateDeal: builder.mutation({
      query: ({body,id}) => ({  
        url: `deals/${id}`,
        method: "PUT",
        body,
      }),
        invalidatesTags: ['Agent'], // Invalidate the 'Agent' tag to refetch data   
    }),


    // get all chargeback 
    getChargeback: builder.query({
      query: ({searchTerm, page,limit}) => ({
        url: "/deals?ChargebackStatus=PENDING",
        method: "GET",
        params:{
            searchTerm,
            page: String(page),   // Ensure it's a string
            limit: String(limit), // Ensure it's a string
        }
      }),
      providesTags: ['Agent'], 
    }),



   

   
  }),
  overrideExisting: false,
  
});

export const {
   useGetAgentQuery,
   useGetAgentByIdQuery,
   useAddAgentStatusMutation,
   useAddAgentLevelMutation,
   useGetAgentDealRequestQuery,
   useUpdateDealStatusMutation,
   useUpdateDealMutation,
   useGetChargebackQuery

   

 // Export the update mutation hook
} = agentApi;

export default agentApi;
