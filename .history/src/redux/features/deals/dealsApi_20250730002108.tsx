import baseApi from "../../api/baseApi";

const dealsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({



        // Add deals 
        addDeals: builder.mutation({
            query: () => ({
                url: "/users?approvalStatus=APPROVED",
                method: "POST",
            }),
            invalidatesTags: ['Deals'],
        }),



    }),
    overrideExisting: false,

});

export const {
    useAddDealsMutation,


    // Export the update mutation hook
} = dealsApi;

export default dealsApi;
