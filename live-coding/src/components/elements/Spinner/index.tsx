import React, { FC } from "react"

// Styled Elements
import { MainWrapper, Svg } from "./index.styled"

export interface SpinnerProps {
    color?: string
    active?: boolean
    fullPage?: boolean
    fullBgColor?: string
}

const defaultValues = {
    color: "#687186",
    active: true,
    fullPage: false,
    fullBgColor: "rgba(255, 255, 255, 0.7)",
}

const Spinner: FC<SpinnerProps> = ({
    active = defaultValues.active,
    color = defaultValues.color,
    fullPage = defaultValues.fullPage,
    fullBgColor = defaultValues.fullBgColor,
}) => {
    return (
        <>
            {active && (
                <MainWrapper fullPage={fullPage} fullBgColor={fullBgColor}>
                    <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 50 50"
                    >
                        <path
                            fill={color}
                            d="M30.9 42.993C40.68 39.704 45.94 29.1 42.65 19.33S28.767 4.288 18.987 7.577l1.297 3.856a14.62 14.62 0 0118.512 9.193c2.573 7.65-1.542 15.938-9.193 18.512l1.297 3.856z"
                        />
                    </Svg>
                </MainWrapper>
            )}
        </>
    )
}

export default Spinner
