import {
    getAuth,
    // signInWithPopup,
    // GoogleAuthProvider,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateEmail,
    updateProfile,
    deleteUser,
    updatePassword,
    getIdToken,
    signOut
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import authInitalize from '../firebase/firebase.inti';
authInitalize();

const useFirebase = () => {
    // const GoogleProvider = new GoogleAuthProvider();
    const auth = getAuth();
    const [user, setUser] = useState({});
    const [authError, setAuthError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(false);

    //Email Registration
    const userRegistration = (name, email, password, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');

                const newUser = { email, displayName: name };
                setUser(newUser);
                //Save user to the database
                saveUser(email, name, 'POST');
                updateProfile(auth.currentUser, {
                    displayName: name
                })
                    .then(() => {})
                    .catch((error) => {});
                history.push('/createnote');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    };

    //Login With email
    const loginWithEmail = (email, password, history, location) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                const destination = location?.state?.from || '/home';
                history.push(destination);
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    };

    // const loginWithGoogle = () => {
    //     setIsLoading(true);
    //     return signInWithPopup(auth, GoogleProvider);
    //     // .then((result) => {
    //     //     const user = result.user;
    //     //     setUser(user);
    //     // })
    //     // .catch((error) => {
    //     //     setLogingError(error.massage);
    //     // })
    //     // .finally(() => setIsLoading(false));
    // };
    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {
                setUser({});
            })
            .catch((error) => {
                setAuthError(error.massage);
            })
            .finally(() => setIsLoading(false));
    };

    //Save user to the database
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('https://quiet-crag-38399.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then((res) => res.json)
            .then((data) => {});
    };

    //Update Profile
    const updateProfileInfo = (name, email, password) => {
        updateProfile(auth.currentUser, {
            displayName: name
            // photoURL: 'https://example.com/jane-q-user/profile.jpg'
        })
            .then(() => {})
            .catch((error) => {
                setAuthError(error.massage);
            });

        updateEmail(auth.currentUser, email)
            .then(() => {})
            .catch((error) => {
                setAuthError(error.massage);
            });

        if (password) {
            updatePassword(user, password)
                .then(() => {
                    // Update successful.
                })
                .catch((error) => {
                    setAuthError(error.massage);
                });
        }
        alert('successfully update');
    };

    //Delete User
    const deleteAccount = () => {
        const user = auth.currentUser;

        deleteUser(user)
            .then(() => {
                fetch(
                    `https://quiet-crag-38399.herokuapp.com/users/${user.email}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount) {
                            alert('Successfully User deleted!');
                        }
                    });
            })
            .catch((error) => {
                setAuthError(error.massage);
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getIdToken(user).then((idToken) =>
                    localStorage.setItem('idToken', idToken)
                );
                setUser(user);
            } else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribe;
    }, [auth]);

    useEffect(() => {
        fetch(
            `https://quiet-crag-38399.herokuapp.com/users_admin/${user.email}`
        )
            .then((res) => res.json())
            .then((result) => setAdmin(result.admin));
    }, [user.email]);

    return {
        user,
        isLoading,
        admin,
        userRegistration,
        loginWithEmail,
        setIsLoading,
        authError,
        updateProfileInfo,
        deleteAccount,
        logOut
    };
};
export default useFirebase;
