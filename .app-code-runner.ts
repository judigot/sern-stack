import User from "./src/sequelize/models/SampleModel";
import UserOld from "./src/sequelize/models/";

User.findAll()
  .then((data: any) => {
    console.log(data);
  })
  .catch((error: any) => {
    console.log(error);
  });

// console.log(User);
// console.log(UserOld);
