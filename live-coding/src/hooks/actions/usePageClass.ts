import { useEffect } from "react"

export type TypeusePageClass = {
    name: string
    prefix?: string
}

export const usePageClass = ({
    name,
    prefix = "ActivePage",
}: TypeusePageClass) => {
    const HTML = document.documentElement

    const LayoutClass = `${prefix}--${name}`

    useEffect(() => {
        HTML.classList.add(LayoutClass)

        return () => {
            HTML.classList.remove(LayoutClass)
        }
    }, [])
}
