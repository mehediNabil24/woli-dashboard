import baseApi from "../../api/baseApi";

const dealsApi = baseApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({

        // Add deals 
        addDeals: builder.mutation({
            query: (data) => ({
                url: "/deals",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Deals'],
        }),

        // Add deals 
        getProductQuery: builder.query({
            query: (id) => ({
                url: `/companies/${id}/products`,
                method: "GET",

            }),
            providesTags: ['Deals'],
        }),


    }),


});

export const {
    useAddDealsMutation,
    useGetProductQueryQuery
} = dealsApi;

export default dealsApi;
