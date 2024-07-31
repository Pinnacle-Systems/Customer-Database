import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CUSTOMER_RELATION } from "../../Api";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const customerRelationsApi = createApi({
    reducerPath: "customerRelations",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ["CreateCustomer"],
    endpoints: (builder) => ({
        getCustomersRelation: builder.query({
            query: () => {

                return {
                    url: CUSTOMER_RELATION,
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },

                };


            },
            providesTags: ["CreateCustomer"],
        }),
        getCustomerId: builder.query({
            query: (id) => {
                return {
                    url: `${CUSTOMER_RELATION}/${id}`,
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                };
            },
            providesTags: ["CreateCustomer"],
        }),


    }),
});

export const {
    useGetCustomersRelationQuery,


} = customerRelationsApi;

export default customerRelationsApi;
