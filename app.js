const express = require("express");
const mongoose = require("mongoose");
const Signup = require("./routes/signup");
const Dashboard = require("./routes/dashboard");
const Login = require("./routes/login");
const multer = require("multer");
var dateFormat = require("dateformat");

var dateForm = require("dateformater-priti");

const formettedDate = dateForm(); //formats current date using self published package
console.log(formettedDate);

//var upload = multer({ dest: "uploads/" }); //folder to store image
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/profile", express.static('images')); // Allows server to access data inside images folder
app.use("/signup", Signup);
app.use("/dashboard", Dashboard);
app.use("/login", Login);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

var upload = multer({ storage: storage });

// app.get("/get", async (req, res) => {
//   console.log("here");
//   const getAllUsers = await User.find();
//   res.json({ getAllUsers });
// });

app.get("/get", async (req, res) => {
  const date = Date.now();
  console.log(date);

  const formettedDate = dateFormat(date, "paddedShortDate"); //paddedShortDate

  console.log(formettedDate);

  // console.log(newDate.toLocaleString().split(",")[0]);
  // console.log(
  //   newDate.getFullYear() + "/" + newDate.getMonth() + "/" + newDate.getDay()
  // );
});

//image upload starts
app.post("/demo", upload.single("image"), (req, res) => {
  console.log(req.body);
});
//image upload ends

//database connection code starts ******
const url =
  "mongodb+srv://Priti:Priti123@cluster0.ykagy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    //autoIndex: true, //make this also true
  },
  (err) => {
    if (err) {
      console.log("Error while connecting to database: ", err.message);
    } else {
      console.log("DB connected");
    }
  }
);
//database connection code ends ******

app.listen(3001, () => {
  console.log("server started at port 3001");
});
