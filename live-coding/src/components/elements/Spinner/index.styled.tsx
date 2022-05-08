import styled, { css } from "styled-components"

export const Svg = styled.svg`
    cursor: progress;
    display: block;
    max-width: 100%;
    height: auto;
    margin: 0 auto;

    path {
        transform-origin: center;
        animation: 0.6s linear infinite rotate;
    }

    @keyframes rotate {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
`

type MainWrapperProps = {
    fullPage?: boolean
    fullBgColor?: string
}
export const MainWrapper = styled.section(
    ({ fullPage, fullBgColor }: MainWrapperProps) => {
        if (fullPage) {
            return css`
                cursor: progress;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: ${fullBgColor};
                z-index: 9999999;
                position: fixed;
            `
        }
    }
)
