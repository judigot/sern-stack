import { initializeApp } from "firebase/app";

import {
  getDatabase,
  ref,
  child,
  onValue,
  set,
  get,
  update,
  remove,
} from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "", // Add Firebase Realtime Database URL here
};
const DB = getDatabase(initializeApp(firebaseConfig));

//====================CRUD====================//

const id = 1;

// //=====CREATE=====//
const data = {
  first_name: "John",
  last_name: "Doe",
};
set(ref(DB, `users/${id}`), data);
// //=====CREATE=====//

// //=====READ=====//
// // Version 1
// const query = `users/${id}`;
// get(child(ref(DB), query))
//   .then((snapshot) => {
//     if (snapshot.exists()) {
//       console.log(snapshot.val());
//     } else {
//       console.log("No data available");
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// // Version 2
// // const users = async () => {
// //   const snapshot = await get(child(ref(DB), query));
// //   return snapshot.val();
// // };
// // users()
// //   .then((value) => {
// //     console.log(value);
// //   })
// //   .catch((error) => {
// //     console.log(error);
// //   })
// //   .finally(() => {
// //     // Finally
// //   });
// //=====READ=====//

// //=====UPDATE=====//
// update(ref(DB, `users/${id}`), {
//   first_name: "Johnny",
// });
// //=====UPDATE=====//

//=====DELETE=====//
// remove(ref(DB, `users/${id}`));
//=====DELETE=====//

//====================CRUD====================//
