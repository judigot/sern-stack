// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  getDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  deleteField,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACA0DRfKqH5n2vi9PzlT5aMuwO-fDwHTc",
  authDomain: "bigbang-a848c.firebaseapp.com",
  databaseURL:
    "https://bigbang-a848c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bigbang-a848c",
  storageBucket: "bigbang-a848c.appspot.com",
  messagingSenderId: "209144178107",
  appId: "1:209144178107:web:405104d320e8d1353e909e",
  measurementId: "G-YK5BRCE6PE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//====================CRUD====================//

const users = collection(db, "users");

//=====CREATE=====//
// const create = async () => {
//   return await addDoc(users, {
//     firstName: "Jude Francis",
//     lastName: "Igot",
//     age: 26,
//   });
// };
// create()
//   .then((result) => {
//     // Success
//     console.log(`Data with ID ${result.id} was inserted.`);
//   })
//   .catch((error) => {
//     // Failure
//     console.log(error);
//   })
//   .finally(() => {
//     // Finally
//   });
//=====CREATE=====//

//=====READ=====//
// const read = async () => {
//   //=====SELECT A SINGLE DOCUMENT=====//
//   // return await getDoc(doc(users, "9KCeRdtj2uKRt6SNlQms"));
//   //=====SELECT A SINGLE DOCUMENT=====//

//   //=====SELECT WITH CONDITION=====//
//   const q = query(users, where("firstName", "==", "Jude Francis"));
//   return await getDocs(q);
//   //=====SELECT WITH CONDITION=====//

//   //=====SELECT ALL=====//
//   // return await getDocs(users);
//   //=====SELECT ALL=====//
// };
// read()
//   .then((result) => {
//     if (result.size) {
//       result.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//       });
//     } else {
//       console.log("No data.");
//     }

//     // if (result.exists()) {
//     //   console.log(result.data());
//     // } else {
//     //   // doc.data() will be undefined in this case
//     //   console.log("No such document!");
//     // }
//   })
//   .catch((error) => {
//     // Failure
//   })
//   .finally(() => {
//     // Finally
//   });
//=====READ=====//

//=====UPDATE=====//
// const update = async () => {
//   return await updateDoc(doc(users, "9KCeRdtj2uKRt6SNlQms"), {
//     firstName: "Judas",
//   });
// };
// update()
//   .then((result) => {
//     // Success
//     console.log(result);
//   })
//   .catch((error) => {
//     // Failure
//   })
//   .finally(() => {
//     // Finally
//   });
//=====UPDATE=====//

//=====DELETE=====//
// const del = async () => {
//   //=====DELETE COLLECTION=====//
//   return await deleteDoc(doc(users));
//   //=====DELETE COLLECTION=====//
//   //=====DELETE DOCUMENT=====//
//   return await deleteDoc(doc(users, "2HyoXfpCZZHaDGT7Xd3x"));
//   //=====DELETE DOCUMENT=====//
//   //=====DELETE DOCUMENT FIELDS=====//
//   return await updateDoc(doc(users, "4wZMZaJn06tRbXaXikB7"), {
//     firstName: deleteField(),
//     lastName: deleteField(),
//   });
//   //=====DELETE DOCUMENT FIELDS=====//
// };
// del()
//   .then((result) => {
//     // Success
//     console.log(result);
//   })
//   .catch((error) => {
//     // Failure
//     console.log(error);
//   })
//   .finally(() => {
//     // Finally
//   });
//=====DELETE=====//

//=====OVERRIDE=====//
// const override = async () => {
//   // Override a document with an ID
//   // Create a document with a custom ID
//   await setDoc(doc(users, "LRM0Uu0uxljzpTDLrTyF"), {
//     firstName: "Jude Francis",
//     lastName: "Igot",
//     age: 26,
//   });
// };
// override()
//   .then((value: any) => {
//     console.log("Success");
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   .finally(() => {
//     // Finally
//   });
//=====OVERRIDE=====//
