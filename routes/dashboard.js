const express = require("express");
const DashboardSchema = require("../model/dashboardinfo");
const Upload = require("../commonfunction/fileUpload");
const ImageSchema = require("../model/image");

const router = express.Router();

//importing crud defined function file
const { get, create, update, erase } = require("../commonfunction/function");

router.get("/get", async (req, res) => {
  try {
    const getData = await get(DashboardSchema);
    if (getData) {
      res.status(200).json(getData);
    } else {
      res.status(400).json({ msg: "could not read data " });
    }
  } catch (error) {
    res.status(400).json({ msg: "something went wrong" });
  }
});

var upload = Upload.FileUpload();
router.post("/create", upload.single("imagepath"), async (req, res) => {
  console.log(req.file);

  const { title, description, user } = req.body;

  const data = {
    title,
    description,
    user,
    imagepath: req.file.path,
  };

  try {
    const createData = await create(DashboardSchema, data);
    console.log({ user: createData });
    if (createData) {
      res
        .status(200)
        .json({ user: createData + "DashBoard created succesfully" });
    } else {
      res.status(400).json({ msg: "Could not create data " });
    }
  } catch (err) {
    res.status(400).json({ msg: "Failed to create" + err.message });
  }
});

//to upload image
router.post("/uploadimage", upload.single("imagepath"), async (req, res) => {
  console.log(req.file);
  try {
    const createData = await create(ImageSchema, { imagepath: req.file.path });
    if (createData) {
      res.json({ msg: "Image Upload Successfully" });
    } else {
      res.status(400).json({ msg: "Could not create data " });
    }
  } catch (err) {
    res.status(400).json({ msg: "Failed to create" + err.message });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const newbody = req.body;
    const id = req.params.id;
    const editUser = await update(DashboardSchema, req.params.id, newbody);

    if (editUser) {
      res.status(200).json("Successfully updated" + editUser);
    } else {
      res.status(404).json("Error not updated :");
    }
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong " + err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id:", id);

    const findAndDelete = await erase(DashboardSchema, id);
    if (findAndDelete) {
      res.status(200).json({ msg: "Deleted data " + findAndDelete });
    } else {
      res.status(404).json({ msg: "Not found" });
    }
  } catch (err) {
    res.json({ msg: "Something went wrong" + err.message });
  }
});

module.exports = router;
