import React, { FC, useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "wouter"

// Actions
import { usePageClass } from "@hooks/actions/usePageClass"
import { getProductList, TypeProductListData } from "@hooks/services/backend"

// Components Elements
import Spinner from "@components/elements/Spinner"

// Components Layouts
import LayoutCenter from "@components/layouts/LayoutCenter"

// Styled Elements
import {
    Container,
    Title,
    List,
    Products,
    ProductHead,
    ProductName,
    ProductDescription,
    ProductPrice,
    ProductQuantity,
    ProductQuantityCount,
    ProductQuantityButton,
    ProductCartButton,
    ProductCart,
    ProductCartCount,
    ProductCartText,
} from "./index.styled"

// Svg Icons
import { ReactComponent as IconPlus } from "@components/svgs/plus.svg"
import { ReactComponent as IconMinus } from "@components/svgs/minus.svg"
import { ReactComponent as IconCart } from "@components/svgs/cart.svg"

type TypeProductData = TypeProductListData & {
    qty: number
}

const prepareData = (data: TypeProductListData[]): TypeProductData[] => {
    return data.map((info) => ({
        ...info,
        qty: 0,
    }))
}

export interface InterfaceProductsProps {
    BlockName?: string
}

const DefaultBlockName = "PageProducts"

const PageProducts: FC<InterfaceProductsProps> = ({
    BlockName = DefaultBlockName,
}) => {
    usePageClass({ name: BlockName })

    const [, setLocation] = useLocation()

    const dispatch = useDispatch()

    const { state: fetchedData, fetch } = getProductList()

    const requestedData = useMemo(
        () => prepareData(fetchedData.data),
        [fetchedData.data]
    )

    const [products, updateProducts] = useState<TypeProductData[]>([])

    const catItemCount = useMemo(
        () => products.reduce((total, { qty }) => total + qty, 0),
        [products]
    )

    const isEmptyCart = useMemo(() => catItemCount <= 0, [catItemCount])

    const disableCheckout = useMemo(
        () => isEmptyCart || fetchedData.loading,
        [isEmptyCart, fetchedData.loading]
    )

    const remove = (id: number | string) => {
        updateProducts((old) =>
            old.map((data) => {
                if (id !== data.id) return data

                const qty = data.qty > 0 ? data.qty - 1 : 0

                return {
                    ...data,
                    qty,
                }
            })
        )
    }

    const add = (id: number | string) => {
        updateProducts((old) =>
            old.map((data) => {
                if (id !== data.id) return data

                const qty = data.qty + 1

                return {
                    ...data,
                    qty,
                }
            })
        )
    }

    const viewCart = () => {
        setLocation("/checkout")
    }

    // Fetch on mount
    useEffect(() => {
        fetch()
    }, [fetch])

    // Sync to state
    useEffect(() => {
        updateProducts(requestedData)
    }, [requestedData, updateProducts])

    // Sync to redux
    useEffect(() => {
        const cartItems = products.filter(({ qty }) => qty > 0)

        dispatch({ type: "UPDATE_CART", value: cartItems })
    }, [products, dispatch])

    return (
        <LayoutCenter>
            <Container>
                <Title>Products</Title>

                <Spinner active={fetchedData.loading} />

                {!fetchedData.loading && (
                    <List>
                        {products.map(({ id, name, price, qty }) => (
                            <Products key={id}>
                                <ProductHead />

                                <ProductName>{name}</ProductName>

                                <ProductPrice>
                                    {price.toLocaleString()} MMK
                                </ProductPrice>

                                <ProductQuantity>
                                    <ProductQuantityButton
                                        disabled={qty <= 0}
                                        onClick={() => remove(id)}
                                    >
                                        <IconMinus />
                                    </ProductQuantityButton>

                                    <ProductQuantityCount>
                                        {qty}
                                    </ProductQuantityCount>

                                    <ProductQuantityButton
                                        onClick={() => add(id)}
                                    >
                                        <IconPlus />
                                    </ProductQuantityButton>
                                </ProductQuantity>

                                <ProductDescription>
                                    quantity
                                </ProductDescription>
                            </Products>
                        ))}
                    </List>
                )}

                {!fetchedData.loading && (
                    <ProductCart>
                        <ProductCartButton
                            disabled={isEmptyCart}
                            onClick={viewCart}
                        >
                            <IconCart />

                            <ProductCartCount hidden={isEmptyCart}>
                                {catItemCount}
                            </ProductCartCount>
                        </ProductCartButton>

                        <ProductCartText
                            disabled={disableCheckout}
                            onClick={viewCart}
                        >
                            Checkout
                        </ProductCartText>
                    </ProductCart>
                )}
            </Container>
        </LayoutCenter>
    )
}

export default PageProducts
