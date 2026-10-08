import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from './baseQuery'


// Define a service using a base URL and expected endpoints
export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: baseQueryWithReauth,
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/user/' }),
//   baseQuery: fetchBaseQuery({ baseUrl: '/api/user/' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
        query: (user)=>{
            return {
                url:'register/',
                method:'POST',
                body: user,
                headers: {
                    'Content-type': 'application/json',
                }
            }
        }
    }),
    loginUser: builder.mutation({
      query: (user)=>{
          return {
              url:'login/',
              method:'POST',
              body: user,
              headers: {
                  'Content-type': 'application/json',
              }
          }
      }
    }),
    getLoggedUser: builder.query({
        query: ()=>{
            return {
                url:'profile/',
                method:'GET',
            }
        }
    }),

    getAllDoctor: builder.query({
        query: ({page}) => {
            return {
                url: `doctor-data/?page=${page}`,
                method: 'GET',
            }
        }
    }),

    getDoctor: builder.query({
        query: ({id})=>{
            return {
                url:`doctor-data/${id}/`,
                method:'GET',
            }
        }
    }),

    getSearchDoctor: builder.query({
        query: ({ search_key, page }) => {
            return {
                url: `doctor-data-search/${search_key}/?page=${page}`,
                method: 'GET',
            }
        }
    }),

    doctordata: builder.mutation({
        query: ({data})=>{
            return {
                url:'doctor-data/',
                method:'POST',
                body: data,
            }
        },
    }),

    doctorAppointment: builder.mutation({
        query: ({actualData})=>{
            return {
                url:'appointment/',
                method:'POST',
                body: actualData,
                headers: {
                    'Content-type': 'application/json',
                }
            }
        },
        invalidatesTags: ['Appointment'],
    }),

    getAppointment: builder.query({
        query: ({id, page}) => {
            return {
                url: `appointment/${id}/?page=${page}`,
                method: 'GET',
            }
        },
        providesTags: ['Appointment'],
    }),
    reviewInsert: builder.mutation({
        query: ({actualData})=>{
            return {
                url:'review/',
                method:'POST',
                body: actualData,
                headers: {
                    'Content-type': 'application/json',
                }
            }
        },
        invalidatesTags: ['Review'],
    }),
    reviewRetrieve: builder.query({
        query: ({id})=>{
            return {
                url:`review/${id}/`,
                method:'GET',
            }
        },
        providesTags: ['Review'],
    }),

    changeUserPassword: builder.mutation({
        query: ({actualData})=>{
            return {
                url:'changepassword/',
                method:'POST',
                body: actualData,
                headers: {
                    'Content-type': 'application/json',
                }
            }
        }
    }),
    sendPasswordResetEmail: builder.mutation({
        query: (user)=>{
            return {
                url:'send-reset-password-email/',
                method:'POST',
                body: user,
                headers: {
                    'Content-type': 'application/json',
                }
            }
        }
    }),
    resetPassword: builder.mutation({
        query: ({actualData,id,token})=>{
            return {
                url:`reset-password/${id}/${token}/`,
                method:'POST',
                body: actualData,
                headers: {
                    'Content-type': 'application/json',
                }
            }
        }
    }),
  }),
})

export const { useRegisterUserMutation,useLoginUserMutation,useGetLoggedUserQuery, useChangeUserPasswordMutation,useSendPasswordResetEmailMutation,useResetPasswordMutation, useGetAllDoctorQuery,useGetDoctorQuery ,useGetSearchDoctorQuery,useDoctorAppointmentMutation,useReviewInsertMutation,useReviewRetrieveQuery,useGetAppointmentQuery,useDoctordataMutation} = userAuthApi