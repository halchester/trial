import { useRef } from "react"

export const useBeforeMount = (func: () => void) => {
    const Info = useRef(true)

    const isMounted = Info.current == true

    if (isMounted) {
        func()
    }

    Info.current = false
}
