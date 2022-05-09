import React, {
    FC,
    useCallback,
    useEffect,
    useState,
    SyntheticEvent,
    ChangeEvent,
} from "react"
import useModels from "@packages/react-use-models"
import useValidator from "@packages/react-joi"
import Joi from "joi"
import {
    validateCardNumber,
    formatCardNumber,
    formatCardExpiry,
    parseCardType,
} from "creditcardutils"

// Styled Elements
import {
    Actions,
    Container,
    Fields,
    ErrorMessage,
    FieldControl,
    FieldLabel,
    Input,
    Form,
    FieldGroups,
    FieldsMerge,
    SubmitButton,
} from "./index.styled"

type TypeCheckoutFormDefaultValues = {
    email: string | null
    card_number: string | null
    card_expire: string | null
    cvv: string | null
}

export type TypeCheckoutFormValues = NonNullable<TypeCheckoutFormDefaultValues>

export interface CheckoutFormProps {
    onSuccess: (values: TypeCheckoutFormValues) => void
    loading?: boolean
    submitText?: string
}

const defaultState: TypeCheckoutFormDefaultValues = {
    email: null,
    card_number: null,
    card_expire: null,
    cvv: null,
}

const CheckoutForm: FC<CheckoutFormProps> = ({
    onSuccess,
    loading = false,
    submitText = "Submit",
}) => {
    const [cardType, setCardType] = useState<"visa" | "mastercard" | null>(null)
    const { models, register, updateModel } =
        useModels<TypeCheckoutFormDefaultValues>({
            defaultState,
        })
    const { state, setData } = useValidator({
        initialData: defaultState,
        schema: Joi.object({
            email: Joi.string()
                .email({
                    tlds: { allow: false },
                })
                .required()
                .messages({
                    "string.empty": "Required",
                    "string.email": "Must be a valid email",
                    "any.required": "Required",
                }),
            card_number: Joi.string()
                .custom((value, helpers) => {
                    if (value) {
                        if (!validateCardNumber(value)) {
                            return helpers.error("string.cardNumber")
                        }
                    }

                    return value
                })
                .required()
                .messages({
                    "string.empty": "Required",
                    "string.cardNumber": "Must be a valid card",
                    "any.required": "Required",
                }),
            card_expire: Joi.string().required().messages({
                "string.empty": "Required",
                "any.required": "Required",
            }),
            cvv: Joi.string().length(3).required().messages({
                "string.empty": "Required",
                "string.length": "Maximum 3 digits",
                "any.required": "Required",
            }),
        }),
    })

    const getErrors = useCallback(
        (field) => {
            return state.$errors[field]
                .map((data: any) => data.$message)
                .join(",")
        },
        [state.$errors]
    )

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        onSuccess(state.$data)
    }

    const formatter = {
        cardNumber: (e: ChangeEvent<HTMLInputElement>) => {
            const value = formatCardNumber(e.target.value)

            updateModel("card_number", value)
        },
        cardExpire: (e: ChangeEvent<HTMLInputElement>) => {
            const value = formatCardExpiry(e.target.value)

            updateModel("card_expire", value)
        },
    }

    // Sync model <-> validator
    useEffect(() => {
        setData(models)
    }, [models])

    useEffect(() => {
        setCardType(parseCardType(state.$data.card_number))
    }, [state.$data.card_number])

    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <Fields>
                    <FieldControl>
                        <FieldLabel error={!!getErrors("email")}>
                            Email
                        </FieldLabel>

                        <Input
                            {...register.input({ name: "email" })}
                            type="email"
                            placeholder="you@company.com"
                            autoComplete="current-email"
                        />
                    </FieldControl>

                    {getErrors("email") && (
                        <ErrorMessage>{getErrors("email")}</ErrorMessage>
                    )}
                </Fields>

                <FieldGroups>
                    <Fields>
                        <FieldControl>
                            <FieldLabel error={!!getErrors("card_number")}>
                                Card information
                            </FieldLabel>
                            <Input
                                {...register.input({
                                    name: "card_number",
                                    onChange: formatter.cardNumber,
                                })}
                                type="text"
                                placeholder="1234 1234 1234 1234"
                            />
                            <div
                                style={{
                                    float: "right",
                                    position: "relative",
                                    top: -27.5,
                                    marginRight: 20,
                                }}
                            >
                                <img
                                    src={
                                        cardType === "visa"
                                            ? // below mastercard is because i don't have an active
                                              // state for visa card in figma file, its default is 0.3 opacity
                                              // so i had to improvise here
                                              "/mastercard.png"
                                            : "/visa.png"
                                    }
                                    style={{
                                        opacity: cardType === "visa" ? 1 : 0.3,
                                    }}
                                />
                                <img
                                    src="/mastercard.png"
                                    style={{
                                        marginLeft: 15,
                                        opacity:
                                            cardType === "mastercard" ? 1 : 0.3,
                                    }}
                                />
                            </div>
                        </FieldControl>

                        {getErrors("card_number") && (
                            <ErrorMessage>
                                {getErrors("card_number")}
                            </ErrorMessage>
                        )}
                    </Fields>

                    <FieldsMerge>
                        <Fields>
                            <Input
                                {...register.input({
                                    name: "card_expire",
                                    onChange: formatter.cardExpire,
                                })}
                                type="text"
                                placeholder="MM / YY"
                            />

                            {getErrors("card_expire") && (
                                <ErrorMessage>
                                    {getErrors("card_expire")}
                                </ErrorMessage>
                            )}
                        </Fields>

                        <Fields>
                            <Input
                                {...register.input({ name: "cvv" })}
                                type="text"
                                placeholder="123"
                            />
                            <div
                                style={{
                                    float: "right",
                                    position: "relative",
                                    top: -27.5,
                                    marginRight: 20,
                                }}
                            >
                                <img src="/cvc.png" />
                            </div>

                            {getErrors("cvv") && (
                                <ErrorMessage>{getErrors("cvv")}</ErrorMessage>
                            )}
                        </Fields>
                    </FieldsMerge>
                </FieldGroups>

                <Actions>
                    <SubmitButton disabled={state.$auto_invalid || loading}>
                        {submitText}
                    </SubmitButton>
                </Actions>
            </Form>
        </Container>
    )
}

export default CheckoutForm
