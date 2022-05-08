import { useAxios } from "@hooks/adapters/useAxios"

export const useApiBackend = <InitialState>(initialState: InitialState) => {
    const baseURL = `${import.meta.env.VITE_API_1}`

    const { Request, setAuth, ...rest } = useAxios<InitialState>({
        baseURL,
        initialState,
    })

    // Sets "Authorization" header here
    // useEffect(() => {
    //     setAuth(AuthToken)
    // }, [AuthToken])

    return {
        Request,
        ...rest,
    }
}
