import React from "react"
import { Router, Route, Switch } from "wouter"

// Core Hooks
import { routePreprocess } from "@hooks/actions/routePreprocess"

// Routes info
import Routes from "@app/routes"

const baseUrl = `${import.meta.env.VITE_BASE_PATH}`

const App = () => {
    routePreprocess(Routes)

    return (
        <Router base={baseUrl}>
            <Switch>
                {Routes.map(({ component, path, key }) => (
                    <Route
                        key={path || key}
                        path={path}
                        component={component as any}
                    />
                ))}
            </Switch>
        </Router>
    )
}

export default App
