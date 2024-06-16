import firebase from "firebase/compat/app";
import "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getDatabase, ref,set,  onValue } from "firebase/database";
import { getStorage, ref as storageRef, uploadString, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBjybcFZ0BODY_UNWmqF-pciAHSzETdxSE",
    authDomain: "ebiznes-korepetycje.firebaseapp.com",
    projectId: "ebiznes-korepetycje",
    storageBucket: "ebiznes-korepetycje.appspot.com",
    messagingSenderId: "993251495624",
    appId: "1:993251495624:web:f282f4584f5a4cd1065ffd",
    measurementId: "G-D7NBB1Y122"
  };


  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const storage = getStorage(app);

  
  function writeData(tutorId, subject, logo, tutor, school, cost, description, location) {
    const reference = ref(db, tutorId);
    set(reference, {
      id: tutorId,
      subject: subject,
      logo: logo,
      tutor: tutor,
      school: school,
      cost: cost,
      description: description,
      location: location
    });
  }
export { db, ref, onValue, writeData, storage, storageRef, uploadString, getDownloadURL };
