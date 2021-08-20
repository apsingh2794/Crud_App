const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/CRUD_Data", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connect Successful");
  })
  .catch((err) => {
    console.log(err);
  });
