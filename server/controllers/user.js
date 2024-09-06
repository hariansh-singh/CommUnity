import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { cookieOptions, sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";

// Create a new user and save it to the database and save in cookie
const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;

  const avatar = {
    public_id: "redvrw",
    url: "ergefe",
  };

  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });

  sendToken(res, user, 201, "User created successfully");
};

// Login a user and save in cookie
const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid Username or Password", 404));

  const isMatch = await compare(password, user.password);

  if (!isMatch)
    return next(new ErrorHandler("Invalid Username or Password", 404));

  sendToken(res, user, 201, `Welcome Back, ${user.name}`);
});

// Get the profile of the logged in user
const getMyProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user).select("-password");

  res.status(200).json({
    success: true,
    user,
  });
});

// Logout the user by clearing the cookie
const logout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("CommUnity-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

// Search for a user
const searchUser = TryCatch(async (req, res) => {
  const { name } = req.query;

  return res.status(200).json({
    success: true,
    message: name,
  });
});

export { login, logout, newUser, getMyProfile, searchUser };
