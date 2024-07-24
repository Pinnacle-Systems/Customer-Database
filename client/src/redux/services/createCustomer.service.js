import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CREATE_CUSTOMER } from "../../Api";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const customerApi = createApi({
    reducerPath: "customer",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ["CreateCustomer"],
    endpoints: (builder) => ({
        getCustomers: builder.query({
            query: ({ params, searchParams }) => {
                if (searchParams) {
                    return {
                        url: CREATE_CUSTOMER + "/search/" + searchParams, params,
                        method: "GET",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        },
                        params
                    };
                }
                return {
                    url: CREATE_CUSTOMER,
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                    params
                };
            },
            providesTags: ["CreateCustomer"],
        }),
        getCustomerId: builder.query({
            query: (id) => {
                return {
                    url: `${CREATE_CUSTOMER}/${id}`,
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                };
            },
            providesTags: ["CreateCustomer"],
        }),
        addCustomer: builder.mutation({
            query: (payload) => ({
                url: CREATE_CUSTOMER,
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }),
            invalidatesTags: ["CreateCustomer"],
        }),

    }),
});

export const {
    useGetCustomersQuery,
    useAddCustomerMutation,

} = customerApi;

export default customerApi;
