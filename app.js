const express = require("express");
const app = new express();
const port = process.env.PORT || 3004;
const path = require("path");
const hbs = require("hbs");
// const ejs = require("ejs");
const bodyParser = require("body-parser");
require("./server/database/connections");
const Register = require("./server/model/model");

// hbs file connect Header Footer

// Set View Engine
app.set("view engine", "hbs");
// app.set("view engine", "ejs");

// load Assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// For fatch data from mongo DB
app.get("/", (req, res) => {
  Register.find({}, function (err, datas) {
    res.render("index", {
      dataList: datas,
    });
  });
});

app.get("/add_user", (req, res) => {
  res.render("add_user");
});

app.get("/update_user", (req, res) => {
  res.render("update_user");
});

// Add user
app.post("/add_user", async (req, res) => {
  try {
    const registerEmployee = new Register(req.body);
    const registerData = await registerEmployee.save();
    res.render("add_user");
  } catch (err) {
    console.log(err);
  }
});

// Update Data
app.post("/update", async (req, res) => {
  try {
    Register.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
      (err, doc) => {
        if (!err) {
          // After Update Show this Fresh data
          Register.find({}, function (err, datas) {
            res.render("index", {
              dataList: datas,
            });
          });
        } else {
          console.log("Error");
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

// Edit data Section
app.get("/employee/:id", async (req, res) => {
  try {
    Register.findById(req.params.id, (err, doc) => {
      if (!err) {
        res.render("update_user", {
          employee: doc,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    const DelData = await Register.findByIdAndDelete(req.params.id);
    Register.find({}, function (err, datas) {
      res.render("index", {
        dataList: datas,
      });
    });

  } catch (err) {
    console.log(err);
  }
});

// app.get("/delete/:id", async (req, res) => {
//   try {
//     Register.findByIdAndRemove(req.params.id, (err, doc) => {
//       if (!err) {
//         // After Delete Show this Fresh data
//         Register.find({}, function (err, datas) {
//           res.render("index", {
//             dataList: datas,
//           });
//         });
//       } else {
//         console.log("Error in delete User");
//       }
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
