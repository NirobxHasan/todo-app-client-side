import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';

const authInitalize = () => {
    initializeApp(firebaseConfig);
};
export default authInitalize;
