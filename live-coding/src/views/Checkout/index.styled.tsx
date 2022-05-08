import styled from "styled-components"

export { Title } from "@styles/common.styled"

export const Container = styled.section`
    width: 420px;
    max-width: 100%;
    padding: 40px 20px;
`

export const List = styled.section`
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 15px;

    margin-bottom: 35px;
`

export const Products = styled.article`
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-gap: 20px;
    justify-content: space-between;
`

export const ProductHead = styled.header`
    width: 36px;
    height: 36px;
    border-radius: 5px;
    background-color: #fcfcfc;
    border: 3px solid var(--dorminant_1);

    margin: 0 auto;
    margin-bottom: 4px;
`

export const ProductContent = styled.nav`
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto 1fr;
    grid-gap: 3px;
`

export const ProductLabel = styled.h3`
    font-size: 0.875em;
    font-weight: 700;
    color: var(--product_label);
`

export const ProductPrice = styled.div`
    font-size: 0.6875em;
    font-weight: 500;
    color: var(--dorminant_1);
`

export const ProductTotalPrice = styled.div`
    text-align: right;

    font-size: 0.875em;
    font-weight: 700;
    color: var(--dorminant_1);
`

export const ProductQuantity = styled.div`
    text-align: right;

    font-size: 0.75em;
    font-weight: 500;
    color: var(--product_description);
`
