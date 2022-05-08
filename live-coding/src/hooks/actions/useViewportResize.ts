import { useEffect, useState } from "react"

import { useBeforeMount } from "@hooks/actions/useBeforeMount"

export const useViewportResize = () => {
    const [viewport, setViewport] = useState({
        width: 0,
        height: 0,
    })

    const updateViewport = () => {
        setViewport({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }

    useBeforeMount(updateViewport)

    // Subsbribe to Events
    useEffect(() => {
        window.addEventListener("resize", updateViewport)

        return () => {
            window.removeEventListener("resize", updateViewport)
        }
    }, [])

    return {
        viewport,
    }
}
