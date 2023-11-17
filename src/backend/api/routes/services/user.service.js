import { User } from "../../models/user.js";

export const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    const userResponse = user.toObject();
    delete userResponse.password;
    userResponse.token = token;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 2 * 60 * 60 * 1000,
      path: "/",
      sameSite: process.env.NODE_ENV !== "development" ? "none" : "lax",
    });

    res.json({ "access_token:": userResponse.token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 2 * 60 * 60 * 1000,
      path: "/",
      sameSite: process.env.NODE_ENV !== "development" ? "none" : "lax",
    });
    res.send("Logout with success!");
  } catch (e) {
    res.status(500).send();
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
};

export const getUserbyId = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) return res.status(404).send("User not found");

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });

    if (!user) return res.status(404).send("User not found");

    const updateData = req.body;

    const updateUser = await User.findByIdAndUpdate(user, updateData, {
      new: true,
    });

    res.json(updateUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id });

    if (!user) throw new Error("User not found");

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};