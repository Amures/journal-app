import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {

    try {
        
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //const credentials = GoogleAuthProvider.credentialFromResult( result );
        const {displayName, email, photoURL, uid} = result.user;
        //console.log({user});

        return {
            ok: true,
            // user info
            displayName, email, photoURL, uid
        }

    } catch (error) {
        
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        
        return {
            ok: false,
            errorMessage,
        }
    }
}


export const registerUserWithEmailPassword = async({email, password, displayName}) => {

    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL} = resp.user;

        await updateProfile( FirebaseAuth.currentUser, { displayName } );
        return {
            ok: true,
            uid, displayName, photoURL, email
        }
    } catch (error) {
        // console.log(error);
        return {ok:false, errorMessage: error.message}
    }
}


export const loginWithEmailPassword = async({email, password}) => {
    
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL, displayName} = resp.user;
        return {
            ok: true,
            uid, displayName, photoURL
        }
    } catch (error) {
        // console.log(error);
        return {ok:false, errorMessage: error.message}
    }
}



export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}