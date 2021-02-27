import React from "react";
import {AuthLaborContextType,} from "../../types";

export const authLaborContext = {
    authFunctions: {
        signIn: () => {
        },
        signInGoogle: () => {
        },
        signInDummy: () => {
        },
        signOutAndRemove: () => {
        },
        signUp: () => {
        },
    },
    authedResult: {
        isLoading: true,
        isSignOut: false,
        accessToken: undefined,
        redirection: undefined
    }
}
export const AuthLaborContext = React.createContext<AuthLaborContextType>(authLaborContext);
