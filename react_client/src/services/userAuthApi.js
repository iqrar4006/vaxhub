import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/user/' }),
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
        query: (access_token)=>{
            return {
                url:'profile/',
                method:'GET',
                headers: {
                    'authorization': `Bearer ${access_token}`,
                }
            }
        }
    }),

    getAllDoctor: builder.query({
        query: (access_token)=>{
            return {
                url:'doctor-data/',
                method:'GET',
                headers: {
                    'authorization': `Bearer ${access_token}`,
                }
            }
        }
    }),
    getDoctor: builder.query({
        query: ({id,access_token})=>{
            return {
                url:`doctor-data/${id}/`,
                method:'GET',
                headers: {
                    'authorization': `Bearer ${access_token}`,
                }
            }
        }
    }),
    getSearchDoctor: builder.query({
        query: ({search_key,access_token})=>{
            return {
                url:`doctor-data-search/${search_key}/`,
                method:'GET',
                headers: {
                    'authorization': `Bearer ${access_token}`,
                }
            }
        }
    }),
    doctordata: builder.mutation({
        query: ({data,access_token})=>{
            return {
                url:'doctor-data/',
                method:'POST',
                body: data,
                headers: {
                    
                    'authorization': `Bearer ${access_token}`,
                }
            }
        },
    }),
    doctorAppointment: builder.mutation({
        query: ({actualData,access_token})=>{
            return {
                url:'appointment/',
                method:'POST',
                body: actualData,
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${access_token}`,
                }
            }
        },
        invalidatesTags: ['Appointment'],
    }),
    getAppointment: builder.query({
        query: ({id,access_token})=>{
            return {
                url:`appointment/${id}/`,
                method:'GET',
                headers: {
                    'authorization': `Bearer ${access_token}`,
                }
            }
        },
        providesTags: ['Appointment'],
    }),
    reviewInsert: builder.mutation({
        query: ({actualData,access_token})=>{
            return {
                url:'review/',
                method:'POST',
                body: actualData,
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${access_token}`,
                }
            }
        },
        invalidatesTags: ['Review'],
    }),
    reviewRetrieve: builder.query({
        query: ({id,access_token})=>{
            return {
                url:`review/${id}/`,
                method:'GET',
                headers: {
                    'authorization': `Bearer ${access_token}`,
                }
            }
        },
        providesTags: ['Review'],
    }),

    

    changeUserPassword: builder.mutation({
        query: ({actualData, access_token})=>{
            return {
                url:'changepassword/',
                method:'POST',
                body: actualData,
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${access_token}`,
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
                url:`/reset-password/${id}/${token}/`,
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