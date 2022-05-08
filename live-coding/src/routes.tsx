import React, { ReactNode } from "react"
import { RouteProps } from "wouter"

// Hooks
import { TypeRoutePreprocess } from "@hooks/actions/routePreprocess"

// Views
import PageProducts from "@views/Products"
import PageCheckout from "@views/Checkout"

/**
 * @key Route identity
 * @component A component/ReactNode to render
 */
export interface InterfaceRoutes extends TypeRoutePreprocess {
    key: string
    component: RouteProps["component"] | ReactNode
}

const Routes: InterfaceRoutes[] = [
    {
        path: "/",
        key: "products",
        title: "Products",
        component: PageProducts,
    },
    {
        path: "/checkout",
        key: "checkout",
        title: "Checkout",
        component: PageCheckout,
    },
    {
        key: "404",
        title: "Page not found",
        component: () => <>404, Not Found!</>,
    },
]

export default Routes
