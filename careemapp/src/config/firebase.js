import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAaluV9CGAdgtygwoV0ivD0KLLqHPOFlhM",
    authDomain: "learningreacts.firebaseapp.com",
    databaseURL: "https://learningreacts-default-rtdb.firebaseio.com",
    projectId: "learningreacts",
    storageBucket: "learningreacts.appspot.com",
    messagingSenderId: "163215202336",
    appId: "1:163215202336:web:80c1fe48a82d6fbdff8445",
    measurementId: "G-D516B0CYES"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export default db

async function requestARide(rideRequest) {
    await addDoc(collection(db, "rides"), {
        ...rideRequest,
        timestamp: Date.now()
    });
    
    alert("Ride requested successfully! Let's wait for the driver")
}

export {
    requestARide
}

