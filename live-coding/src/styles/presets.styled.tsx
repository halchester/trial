import { css } from "styled-components"

export const screenMax = (size: number, styles: Function) => css`
    @media only screen and (max-width: ${size}px) {
        ${styles()}
    }
`

export const xPrefixes = () => css`
    display: block;
    content: " ";
    position: absolute;
    z-index: 0;
`

export const xBefore = () => css`
    &:before {
        ${xPrefixes()}
    }
`

export const xAfter = () => css`
    &:after {
        ${xPrefixes()}
    }
`

export const xPrepare = () => css`
    position: relative;

    ${xBefore()}
    ${xAfter()}
`

export const resetButton = (block = true) => css`
    ${block &&
    css`
        display: block;
    `}

    cursor: pointer;
    background: none;
    border: none;
    padding: 0;

    &:disabled {
        cursor: not-allowed;
    }
`

export const resetInput = () => css`
    display: block;
    background: none;
    border: none;
`

export const normalTransitions = () => css`
    transition: 0.3s all;
`
