const express = require("express");
const UserSchema = require("../model/userinfo");
const bcrypt = require("bcryptjs");
var dateFormat = require("dateformat");

const router = express.Router();
//importing crud defined function file
const {
  get,
  create,
  update,
  erase,
  read
} = require("../commonfunction/function");

router.get("/get", async (req, res) => {
  try {
    console.log("here");

    //const getAllUsers = await UserSchema.find();
    const getData = await get(UserSchema);
    if (getData) {
      res.status(200).json(getData);
    } else {
      res.status(400).json({ msg: "could not read data " });
    }
  } catch (error) {
    res.status(400).json({ msg: "something went wrong" });
  }
});

router.get("/read/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getUserData = await read(UserSchema, id);
    console.log(getUserData);

    if (getUserData) {
      const { username, createdAt } = getUserData;
      const formattedDate = dateFormat(createdAt, "paddedShortDate"); //paddedShortDate
      console.log(formattedDate);

      const strmsg = `${username} was signed up on ${formattedDate}`;
      res.status(200).json({ strmsg });
    } else {
      res.status(400).json({ msg: "could not read data " });
    }
  } catch (error) {
    res.status(400).json({ msg: "something went wrong" });
  }
});

router.post("/create", async (req, res) => {
  try {
    // const newUser = new UserSchema(req.body);
    // const createdUser = await newUser.save();
    const { name, username, password, address, phoneno } = req.body; //deconstruct

    const hashedPwdValue = await bcrypt.hash(password, 10);
    console.log(hashedPwdValue);

    req.body.password = hashedPwdValue;
    console.log(hashedPwdValue);

    const currentdate = Date.now(); // to store the signup date & time of user
    console.log(currentdate);
    const newDate = new Date(currentdate);
    console.log(newDate);

    const tempObj = {
      name,
      username,
      password: hashedPwdValue,
      address,
      phoneno
      //signupdate: currentdate,
    };

    const createData = await create(UserSchema, tempObj);
    console.log({ user: createData });
    if (createData) {
      res.status(200).json({ user: createData + "User created succesfully" });
    } else {
      res.status(400).json({ msg: "could not create data " });
    }
  } catch (err) {
    res.status(400).json({ msg: "failed to create" + err.message });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const newbody = req.body;

    // const editUser = await UserSchema.findByIdAndUpdate(
    //   { _id: req.params.id },
    //   { $set: { newbody } }
    // );
    const id = req.params.id;
    console.log("update funtion ", newbody);
    const editUser = await update(UserSchema, req.params.id, newbody);

    if (editUser) {
      res.status(200).json("successfully updated" + editUser);
    } else {
      res.status(404).json("error not updated :");
    }
  } catch (err) {
    res.status(400).json({ msg: "something went wrong " + err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id:", id);

    // const findAndDelete = await UserSchema.findByIdAndDelete({
    //   _id: req.params.id
    // });

    const findAndDelete = await erase(UserSchema, id);
    if (findAndDelete) {
      res.status(200).json({ msg: "deleted data " + findAndDelete });
    } else {
      res.status(404).json({ msg: "not found" });
    }
    // findAndDelete
    //   ? res.json({ findAndDelete })
    //   : res.status(404).json({ msg: "not found" });
  } catch (err) {
    res.json({ msg: "something went wrong" + err.message });
  }
});
module.exports = router;
