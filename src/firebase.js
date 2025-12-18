import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_EfunyP6uk2dcK_CYF-4_VzkatvjOIQI",
  authDomain: "pokedex-1363b.firebaseapp.com",
  projectId: "pokedex-1363b",
  storageBucket: "pokedex-1363b.firebasestorage.app",
  messagingSenderId: "1059407913814",
  appId: "1:1059407913814:web:69afc54e859de8526b6cf7",
  measurementId: "G-K3LVXVQHFG",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
