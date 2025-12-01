import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import firebaseConfig from './firebseConfig';
import { createContext, useState } from "react";
import LocationProvider from "./LocationProvider";

firebase.initializeApp(firebaseConfig);

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const auth = Auth();
    return (
        <LocationProvider>
            <UserContext.Provider value={auth}>
                {children}
            </UserContext.Provider>
        </LocationProvider>
    );
};

const Auth = () => {
    const [user, setUser] = useState({});
    const signInUser = (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res);
                const { displayName, email } = res.user;
                const newUser = {
                    name: displayName,
                    email: email,
                    isSignedIn: true,
                    error: '',
                }
                setUser(newUser);
                return true;
            }).catch(error => {
                const newUser = {};
                newUser.error = error.message;
                newUser.isSignedIn = false;
                setUser(newUser);
                return false;
            })
    }
    const signUpUser = (name, email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async res => {
                await updateUserName(name).then(res => res);
                const { displayName, email } = res.user;
                const newUser = {
                    name: displayName,
                    email: email,
                    isSignedIn: true,
                    error: '',
                }

                setUser(newUser);
                return true;
            }).catch(error => {
                const newUser = {};
                newUser.error = error.message;
                newUser.isSignedIn = false;
                setUser(newUser);
                return false;
            });
    }

    const signOut = () => {
        return firebase.auth().signOut().then(() => {
            setUser({});
            return true;
        }).catch(error => {
            const newUser = { ...user };
            newUser.error = error.message;
            setUser(newUser);
            return false;
        })
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        return user.updateProfile({
            displayName: name,
        }).then(() => {
            console.log('update successfully');
            return true;
        })

    }
    const removeError = () => {
        setUser({ ...user, error: '' });
    }
    return { user, signInUser, signUpUser, signOut, removeError }
}



export default UserProvider;