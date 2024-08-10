import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logOut } from "./";

export const checkingAuthentication = (email, password) => {
    return async(dispatch) => {

        dispatch(checkingCredentials());

    }
}


export const startGoogleSignIn = () => {
    return async(dispatch) => {

        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        if ( !result.ok) return dispatch( logOut(result.errorMessage));

        dispatch( login(result) )
    }
}


export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});
        if( !ok ) return dispatch(logOut({errorMessage}));

        dispatch( login({uid, displayName, email, photoURL}) );
    }
}


export const startLoginWithEmailPassword = ({email, password}) => {
    return async(dispatch) => {

        dispatch(checkingCredentials());
        const result = await loginWithEmailPassword({email,password});

        console.log({result});
        if ( !result.ok) return dispatch( logOut(result));

        dispatch( login(result) )
    }
}


export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logOut({}));
    }
}