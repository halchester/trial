import styled from "styled-components"

import { resetButton, normalTransitions } from "@styles/presets.styled"

export { Title } from "@styles/common.styled"

export const Container = styled.section`
    padding: 40px 20px;
`

export const List = styled.section`
    max-width: 307px;

    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 50px;
`

export const Products = styled.article`
    text-align: center;
`

export const ProductHead = styled.header`
    width: 60px;
    height: 60px;
    border-radius: 10px;
    background-color: #fcfcfc;
    border: 4px solid var(--dorminant_1);
    box-shadow: var(--product_shadow);

    margin: 0 auto;
    margin-bottom: 4px;
`

export const ProductName = styled.div`
    font-size: 0.875em;
    font-weight: 700;
    color: var(--product_label);

    margin-bottom: 6px;
`

export const ProductPrice = styled.div`
    font-size: 0.6875em;
    font-weight: 500;
    color: var(--dorminant_1);

    margin-bottom: 8px;
`

export const ProductDescription = styled.div`
    font-size: 0.75em;
    color: var(--product_description);
`

export const ProductQuantity = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 3px;
`

export const ProductQuantityCount = styled.div`
    font-size: 0.875em;
    font-weight: 500;
    color: var(--input_value);

    margin: 0 10px;
`

export const ProductQuantityButton = styled.button`
    ${resetButton()}
    ${normalTransitions()}

    width: 16px;
    height: 16px;
    border: 1px solid var(--input_border);
    border-radius: 3px;

    padding: 3px;

    svg {
        width: 100%;
        height: auto;

        path {
            fill: var(--dorminant_1);
            ${normalTransitions()}
        }
    }

    &:disabled {
        svg path {
            fill: var(--input_border);
        }
    }

    &:hover:not(:disabled) {
        border-color: var(--dorminant_1);
    }
`

export const ProductCart = styled.footer`
    margin-top: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ProductCartText = styled.button`
    ${resetButton()}

    font-size: 0.75em;
    font-weight: 500;
    color: var(--label);
    text-align: center;

    margin-top: 8px;
`

export const ProductCartCount = styled.span`
    ${normalTransitions()}

    font-size: 0.625em;
    line-height: normal;
    text-align: center;

    min-width: 13px;
    padding: 2px;
    padding-right: 3px;

    color: #fff;
    display: block;
    background-color: var(--notification);
    border-radius: 100%;
    pointer-events: none;

    position: absolute;
    z-index: 1;
    right: -4px;
    top: -5px;

    opacity: 1;

    &[hidden] {
        opacity: 0;
    }
`

export const ProductCartButton = styled.button`
    ${resetButton()}
    ${normalTransitions()}

    width: 35px;
    height: 35px;
    border-radius: 10px;

    position: relative;
    z-index: 0;

    padding: 7px;

    background-color: var(--dorminant_1);
    box-shadow: var(--cart_shadow);

    svg {
        width: 100%;
        height: auto;

        path {
            fill: #fff;
            ${normalTransitions()}
        }
    }

    &:disabled {
        background-color: var(--input_border);

        svg path {
            fill: var(--color_2);
        }
    }

    &:hover:not(:disabled) {
        background-color: #fff;

        svg path {
            fill: var(--dorminant_1);
        }
    }
`
