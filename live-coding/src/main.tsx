import React, { StrictMode } from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { Toaster } from "react-hot-toast"

import { getAppTitle } from "@app/utilities"

import App from "@app/App"
import Store from "@app/store"

import "minireset.css"
import "@styles/default.scss"

// Set default page title
document.title = getAppTitle()

render(
    <StrictMode>
        <Toaster position="top-center" reverseOrder={true} />
        <Provider store={Store}>
            <App />
        </Provider>
    </StrictMode>,
    document.getElementById("root")
)
