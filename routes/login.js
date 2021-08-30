const express = require("express");
const UserSchema = require("../model/userinfo");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
    console.log("inside login");
    try
{
    const { username, password } = req.body;

    //const readData = await readLogin(SignUpSchema, userName);

    const newRead = await UserSchema.findOne({username:username});

    console.log(newRead.password);
   console.log(password);
    const comparePassword = await bcrypt.compare(password , newRead.password);
    console.log(comparePassword);

    if(comparePassword){
        console.log("password matched");

        const generateToken = jwt.sign(
            {username:newRead.username},'secretcode'
        );
        res.status(200).json({ msg: "Login  successful",token:generateToken });
    }else
    {
    console.log("password mismatched");
    res.json({ msg: "Login Unsuccessful, password mismatch" });
    }
}
catch{
    res.status(201).json({ msg: "Something Went Wrong" });
}

});
module.exports = router;