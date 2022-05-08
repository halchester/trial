import { useEffect } from "react"
import { RouteProps, useLocation, useRouter } from "wouter"

import { getAppTitle } from "@app/utilities"

/**
 * @title Browser tab or Document title text
 */
export type TypeRoutePreprocess = Pick<RouteProps, "path"> & {
    title: string
}

export const routePreprocess = (Routes: TypeRoutePreprocess[]) => {
    const { matcher } = useRouter()
    const [location] = useLocation()

    // Sync page title
    useEffect(() => {
        let RouteInfo = Routes.find(
            ({ path }) => matcher(path as any, location)[0]
        )

        // If failed to get route info,
        // Use 404 route info
        if (!RouteInfo) {
            RouteInfo = Routes.find(({ path }) => path == undefined)
        }

        if (!RouteInfo) return

        // Set page Title
        document.title = getAppTitle({
            title: RouteInfo.title,
        })
    }, [location])
}
