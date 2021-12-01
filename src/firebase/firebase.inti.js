import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';

const authenticationInitailization = () => {
    initializeApp(firebaseConfig);
};
export default authenticationInitailization;
