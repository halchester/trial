import { createStore, Reducer as InterfaceReducer } from "redux"

export interface RootState {
    cart: any[]
}

const initialState: RootState = {
    cart: [],
}

const Reducer: InterfaceReducer = (state, action) => {
    const { type, value } = action

    switch (type) {
        case "UPDATE_CART": {
            return {
                ...state,
                cart: value,
            }
        }

        default: {
            return state
        }
    }
}

const Store = createStore(Reducer, initialState)

export default Store
