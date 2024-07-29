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
            query: ({ params }) => {

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
            query: ({ body }) => ({
                url: CREATE_CUSTOMER,
                method: "POST",
                body
            }),
            invalidatesTags: ["CreateCustomer"],
        }),
        updateCustomer: builder.mutation({
            query: ({ id, body }) => {
                return {
                    url: `${CREATE_CUSTOMER}/${id}`,
                    method: "PUT",
                    body
                };
            },
            invalidatesTags: ["Pages"],
        }),
        deleteCustomer: builder.mutation({
            query: (id) => ({
                url: `${CREATE_CUSTOMER}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Pages"],
        }),

    }),
});

export const {
    useGetCustomersQuery,
    useAddCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,


} = customerApi;

export default customerApi;
