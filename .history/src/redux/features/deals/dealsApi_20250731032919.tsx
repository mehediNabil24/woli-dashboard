import { update } from "lodash";
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
        getMyDeals: builder.query({
            query: ({ status, page, limit, searchTerm }) => ({
                url: `/deals/get-my-deals`,
                method: "GET",
                params: {
                    dealStatus: status,
                    page,
                    limit,
                    searchTerm
                }
            }),
            providesTags: ['Deals'],
        }),

        updateDeals: builder.mutation({
            query: ({ id }) => ({
                url: `/deals/${id}`,
                method: "PATCH",
               
            }),
            invalidatesTags: ['Deals'],
        }),


    }),


});

export const {
    useAddDealsMutation,
    useGetProductQueryQuery,
    useGetMyDealsQuery
} = dealsApi;

export default dealsApi;
