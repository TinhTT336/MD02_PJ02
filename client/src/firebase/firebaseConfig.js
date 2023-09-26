import { initializeApp } from "firebase/app";
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDrT_-RgDIUs8HITh13kK0gGeSm0A1U05c",
  authDomain: "md02-project.firebaseapp.com",
  projectId: "md02-project",
  storageBucket: "md02-project.appspot.com",
  messagingSenderId: "368641839700",
  appId: "1:368641839700:web:96ca1048eca93a5cf613c1",
  measurementId: "G-M8QE31QF6R",
};

// Initialize Firebase - khoi tai firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

//tao tham chieu den dich vu luu tru duoc su dung de tham chieu trong toan bo ung dung
const storage = getStorage(app);

// export ra ben ngoai de su dung
export { storage };
