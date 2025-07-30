import baseApi from "../../api/baseApi";

const dealsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
            overrideExisting: false,
        // Add deals 
        addDeals: builder.mutation({
            query: () => ({
                url: "/users?approvalStatus=APPROVED",
                method: "POST",
            }),
            invalidatesTags: ['Deals'],
        }),

    }),


});

export const {
    useAddDealsMutation,


    // Export the update mutation hook
} = dealsApi;

export default dealsApi;
