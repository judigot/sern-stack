import User from "./src/sequelize/models/SampleModel";

User.findAll()
  .then((data: any) => {
    console.log(data);
  })
  .catch((error: any) => {
    console.log(error);
  });
