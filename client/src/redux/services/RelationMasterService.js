import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CREATE_RELATION } from "../../Api";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const relationDetailsApi = createApi({
    reducerPath: "relation",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ["relation"],
    endpoints: (builder) => ({
        getRelation: builder.query({
            query: ({ searchParams, params }) => {
                if (searchParams) {
                    return {
                        url: CREATE_RELATION + "/search/" + searchParams, params,
                        method: "GET",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        },
                    };
                }
                return {
                    url: CREATE_RELATION,
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                };
            },
            providesTags: ["relation"],
        }),
        getRelationById: builder.query({
            query: (id) => {
                return {
                    url: `${CREATE_RELATION}/${id}`,
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                };
            },
            providesTags: ["relation"],
        }),
        addRelation: builder.mutation({
            query: (payload) => ({
                url: CREATE_RELATION,
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }),
            invalidatesTags: ["relation"],
        }),
        updateRelation: builder.mutation({
            query: (payload) => {
                const { id, ...body } = payload;
                return {
                    url: `${CREATE_RELATION}/${id}`,
                    method: "PUT",
                    body,
                };
            },
            invalidatesTags: ["relation"],
        }),
        deleteRelation: builder.mutation({
            query: (id) => ({
                url: `${CREATE_RELATION}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["relation"],
        }),
        getRelationPermissionsById: builder.query({
            query: ({ currentPageId, userRoleId }) => {
                return {
                    url: `${CREATE_RELATION}/getPermissions/${currentPageId}/${userRoleId}`,
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                };
            },
            providesTags: ["relation"],
        })
    }),

});

export const {
    useGetRelationQuery,
    useGetRelationByIdQuery,
    useGetRelationPermissionsByIdQuery,
    useAddRelationMutation,
    useUpdateRelationMutation,
    useDeleteRelationMutation,


} = relationDetailsApi;

export default relationDetailsApi;
