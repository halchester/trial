import { useEffect, useState } from "react"

import Axios, { AxiosResponse } from "axios"

const { CancelToken, isCancel, create } = Axios

export interface InterfaceUseAxios<T> {
    baseURL: string
    initialState: T
}

export const successResolver = <T>({ data }: AxiosResponse<T>) => data

export const useAxios = <InitialState>({
    baseURL,
    initialState,
}: InterfaceUseAxios<InitialState>) => {
    const apiSource = CancelToken.source()
    const cancelToken = apiSource.token

    const Request = create({
        baseURL,
        cancelToken,
    })

    const setAuth = (token?: string | undefined, type: string = "Bearer") => {
        Request.defaults.headers.common["Authorization"] = token
            ? `${type} ${token}`
            : null
    }

    const [state, setState] = useState<InitialState>(() => initialState)

    // Cancel everything on unmount
    useEffect(() => {
        return () => {
            apiSource.cancel()
        }
    }, [])

    return {
        Request,
        state,
        apiSource,
        setState,
        setAuth,
        successResolver,
        isCancel,
    }
}
