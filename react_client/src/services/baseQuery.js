import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken, storeToken, removeToken } from './LocalStorageService'
import { setUserToken, unSetUserToken } from '../features/authSlice'
import { unSetUserInfo } from '../features/userSlice'

const baseQuery = fetchBaseQuery({
    // baseUrl: 'http://127.0.0.1:8000/api/user/',
    baseUrl: '/api/user/',
    prepareHeaders: (headers) => {
        const { access_token } = getToken()

        if (access_token) {
            headers.set(
                'authorization',
                `Bearer ${access_token}`
            )
        }

        return headers
    },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {

        const { refresh_token } = getToken()
        
        if (refresh_token) {

            const refreshResult = await baseQuery(
                {
                    url: 'token/refresh/',
                    method: 'POST',
                    body: {
                        refresh: refresh_token,
                    },
                },
                api,
                extraOptions
            )

            if (refreshResult.data) {

                const newAccessToken = refreshResult.data.access

                storeToken({
                    access: newAccessToken,
                    refresh: refresh_token,
                })

                api.dispatch(
                    setUserToken({
                        access_token: newAccessToken,
                    })
                )

                result = await baseQuery(
                    args,
                    api,
                    extraOptions
                )

            } else {

                removeToken()

                api.dispatch(unSetUserToken({access_token: null,}))
                api.dispatch(unSetUserInfo({id:'',email:'',name:'',is_patient:'',is_doctor:''}))
            }

        } else {

            removeToken()

            api.dispatch(unSetUserToken({access_token: null,}))
            api.dispatch(unSetUserInfo({id:'',email:'',name:'',is_patient:'',is_doctor:''}))
        }
    }

    return result
}

export default baseQueryWithReauth