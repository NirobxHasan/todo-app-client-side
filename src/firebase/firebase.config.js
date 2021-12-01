const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
    //     apiKey: "AIzaSyBSeVw48R6zCMgzUmmxDUh49IJpHdcTXlM",
    //   authDomain: "todo-app-nh.firebaseapp.com",
    //   projectId: "todo-app-nh",
    //   storageBucket: "todo-app-nh.appspot.com",
    //   messagingSenderId: "809683437842",
    //   appId: "1:809683437842:web:a002b90550fb0d69e74bcb"
};
export default firebaseConfig;
