import React, { FC } from "react"

// Actions
import { useLayoutClass } from "@hooks/actions/useLayoutClass"

// Styled Elements
import { Container, InjectGlobalStyle, MainContent } from "./index.styled"

export interface InterfaceLayoutCenterProps {
    BlockName?: string
}

const DefaultBlockName = "LayoutCenter"

const LayoutCenter: FC<InterfaceLayoutCenterProps> = ({
    children,
    BlockName = DefaultBlockName,
}) => {
    useLayoutClass({ name: BlockName })

    return (
        <Container>
            <InjectGlobalStyle />

            <MainContent>{children}</MainContent>
        </Container>
    )
}

export default LayoutCenter
