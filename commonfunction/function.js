const get = async User => {
  try {
    console.log("inside get function");
    const getAllUsers = await User.find().populate("user");
    return getAllUsers;
  } catch (error) {
    return {};
  }
};

const create = async (User, param) => {
  try {
    console.log("inside create function");
    const newUser = new User(param);
    const createdUser = await newUser.save();
    return createdUser;
  } catch (error) {
    return {};
  }
};

const update = async (User, id, newparam) => {
  try {
    console.log("inside update function", newparam);
    const editUser = await User.findByIdAndUpdate(
      { _id: id },
      { $set: newparam }
    );

    return editUser;
  } catch (error) {
    return {};
  }
};

const erase = async (User, id) => {
  try {
    console.log("inside erase function");
    const eraseData = await User.findByIdAndDelete({
      _id: id
    });
    return eraseData;
  } catch (error) {
    return {};
  }
};

//to read the createddate of specicific user id
const read = async (User, id) => {
  try {
    console.log("inside read function");
    const readUser = await User.findById(id);
    return readUser;
  } catch (error) {
    return error.message;
  }
};
module.exports = { get, create, update, erase, read };
