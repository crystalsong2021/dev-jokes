import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIREBASE_KEY ,
  authDomain:process.env.REACT_APP_FIREBASE_DOMAIN ,
  projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID ,
  storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ,
  messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID ,
  appId:process.env.REACT_APP_FIREBASE_DOMAIN ,
  measurementId:process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default getFirestore(app);