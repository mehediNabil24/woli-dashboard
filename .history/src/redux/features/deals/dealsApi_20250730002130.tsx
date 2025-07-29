import baseApi from "../../api/baseApi";

const dealsApi = baseApi.injectEndpoints({
    overrideExisting: false,
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


});

export const {
    useAddDealsMutation,
} = dealsApi;

export default dealsApi;
