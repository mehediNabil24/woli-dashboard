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
  useGetGetProfileQuery,
  useUpdateProfileMutation,
  useAddDocumentMutation,
  useDeleteDocumentMutation
} = profileApi;

export default profileApi;
