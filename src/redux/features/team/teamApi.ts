
import baseApi from "../../api/baseApi";

const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All team scoreboard API
    getTeamScoreboard: builder.query({
      query: ({sortBy,month, page,limit}) => ({
        url: "/teams/team-leader-board",
        method: "GET",
        params: {
          sortBy,
          month,
          page:String(page),   // Ensure it's a string
          limit:String(limit), // Ensure it's a string
        },
      }),
      providesTags: ['Team'],
    }),

    //get all agent scorebasord api
    getAgentScoreboard: builder.query({
      query: ({sortBy,month, page,limit}) => ({
        url: "/users/agent-leader-board",   
        method: "GET",
        params: {
          sortBy,
            month,
            page:String(page),   // Ensure it's a string
            limit:String(limit), // Ensure it's a string
        },
      }),
      providesTags: ['Team'],
    }),

    // creaate team api
    createTeam: builder.mutation({
      query: (body) => ({
        url: "/teams",
        method: "POST",
        body,
      }),
      invalidatesTags: ['Team'],
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
    addDocument: builder.mutation({
      query: (body) => ({
        url: "/users/update-me/document",
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `/users/delete-user-document/${id}`,
        method: 'DeLETE',
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
  overrideExisting: false,
});

export const {
    
  useGetTeamScoreboardQuery,
    useGetAgentScoreboardQuery,
    useCreateTeamMutation,
} = teamApi;

export default teamApi;
