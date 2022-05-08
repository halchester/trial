import { useEffect } from "react"

export type TypeUseLayoutClass = {
    name: string
    prefix?: string
}

export const useLayoutClass = ({
    name,
    prefix = "ActiveLayout",
}: TypeUseLayoutClass) => {
    const HTML = document.documentElement

    const LayoutClass = `${prefix}--${name}`

    useEffect(() => {
        HTML.classList.add(LayoutClass)

        return () => {
            HTML.classList.remove(LayoutClass)
        }
    }, [])
}
