import chalk from "chalk";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import pkg from "google-auth-library";
import mongoose from "mongoose";
const { OAuth2Client } = pkg;

dotenv.config();

const client = new OAuth2Client(process.env.CLIENT_ID);

// user registration controller
export const userRegisterController = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Required Field Missing !!" });
    // check if user already registered
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(409).json({
        success: false,
        message: "User already Registered, Please Login.",
        error: "User already Registered, Please Login.",
      });
    // validate password using regex
    // 🔹 Password Validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        error:
          "Password must be at least 5 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&).",
        message:
          "Password must be at least 5 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&).",
      });
    }
    //hash the password
    const encryptedPassword = await bcrypt.hash(password, 10);
    // create a new user
    const user = await User.create({
      email,
      password: encryptedPassword,
      fullName,
    });

    // generate token
    const userToken = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    // assign token in cookie
    res.cookie("userToken", userToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully !!",
      user: user,
      userToken: userToken,
    });
  } catch (error) {
    // Error handling, error response
    if (error.name === "ValidationError") {
      // Extract validation messages
      const messages = Object.values(error.errors).map((err) => err.message);
      console.error(chalk.bgRed("Validation Error =>>>"), messages);
      return res.status(400).json({
        success: false,
        message: messages[0],
        error: messages[0],
      });
    }
    console.log(
      chalk.bgRedBright(
        "Error in userRegisterController in auth.controller.js ---->> ",
        error
      )
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error !!",
      error: "Error in userRegisterController in auth.controller.js",
    });
  }
};

// login user controller
export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "Required Field Missing !!",
        error: "Required Field Missing !!",
      });
    // check if user not exists
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });

    // Rate limiting for login

    const today = new Date();
    const lastAttemptDate = user.lastLoginAttempt || new Date(0);

    // If it's a new day, reset login attempts
    if (!dayjs(today).isSame(dayjs(lastAttemptDate), "day")) {
      user.loginAttempts = 0;
    }

    // If user has tried 10 times today, block
    if (user.loginAttempts >= 10) {
      return res.status(429).json({
        success: false,
        message: "Too many login attempts. Please try again tomorrow.",
      });
    }
    const isvalidPassword = await bcrypt.compare(password, user.password);

    if (!isvalidPassword) {
      user.loginAttempts += 1;
      user.lastLoginAttempt = today;
      await user.save();
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // On successful login, reset attempt count
    user.loginAttempts = 0;
    user.lastLoginAttempt = today;
    await user.save();
    const userToken = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    // set cookie
    res
      .cookie("userToken", userToken, {
        httpOnly: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        message: "User Login successfull",
        success: true,
        user,
        userToken: userToken,
      });
  } catch (error) {
    // Error handling, error response
    if (error.name === "ValidationError") {
      // Extract validation messages
      const messages = Object.values(error.errors).map((err) => err.message);
      console.error(chalk.bgRed("Validation Error =>>>"), messages);
      return res.status(400).json({
        success: false,
        message: messages[0],
        error: messages[0],
      });
    }
    console.log(
      chalk.bgRedBright(
        "Error in userLoginController in auth.controller.js ---->> ",
        error
      )
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error !!",
      error: "Error in userLoginController in auth.controller.js",
    });
  }
};

//  If lastLoginAttempt is not today, reset attempts to 0.
//  If loginAttempts >= 10, block login for the day.
//  If login fails, increase attempt count and update time.
//  If login succeeds, reset attempt count.

// Register with Google
export const registerWithGoogleController = async (req, res) => {
  try {
    // access token from request body
    const { token } = req.body;
    const tocket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const payload = LoginTicket.getPayload();
    const { sub, name, email, picture } = payload;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        googleId: sub,
        email,
        fullName: name,
        profilePic: picture,
      });
    }
    // generate token
    const userToken = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    // assign token in cookie
    res.cookie("userToken", userToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: process.env.NODE_ENV === "production",
    });
    return res
      .status(200)
      .json({ success: true, message: "Login Successfull", user });
  } catch (error) {
    // Error handling, error response
    if (error.name === "ValidationError") {
      // Extract validation messages
      const messages = Object.values(error.errors).map((err) => err.message);
      console.error(chalk.bgRed("Validation Error =>>>"), messages);
      return res.status(400).json({
        success: false,
        message: messages[0],
        error: messages[0],
      });
    }
    console.log(
      chalk.bgRedBright(
        "Error in registerWithGoogleController in auth.controller.js ---->> ",
        error
      )
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error !!",
      error: "Error in registerWithGoogleController in auth.controller.js",
    });
  }
};

// Update User Controller
export const updateUserController = async (req, res) => {
  try {
    const { user } = req.body;

    // 1. Check if user is authenticated and exists
    const userExists = await User.findById(req.user._id);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: "User not found",
      });
    }

    // 2. Update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: user },
      {
        new: true, // return the updated document
        runValidators: true, // run schema validation
      }
    ).select("-password"); // prevent password from being returned

    // console.log(updatedUser);

    // 3. Send response
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      console.error(chalk.bgRed("Validation Error =>>>"), messages);
      return res.status(400).json({
        success: false,
        message: messages[0],
        error: messages[0],
      });
    }

    // Handle other errors
    console.log(
      chalk.bgRedBright(
        "Error in updateUserController in auth.controller.js ---->> ",
        error
      )
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error !!",
      error: "Error in updateUserController in auth.controller.js",
    });
  }
};

// get profile by id
export const getProfileByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(404)
        .json({
          success: false,
          message: "User not found ",
          error: "Id not found",
        });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User ID", error:'Invalid User Id' });
    }
    const user = await User.findById(id);
    if (!user)
      return res
        .status(404)
        .json({
          success: false,
          message: "User not found ",
          error: "User not found",
        });
    return res
      .status(200)
      .json({
        success: true,
        message: "Profile successfully fetched by id",
        user,
      });
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      console.error(chalk.bgRed("Validation Error =>>>"), messages);
      return res.status(400).json({
        success: false,
        message: messages[0],
        error: messages[0],
      });
    }

    // Handle other errors
    console.log(
      chalk.bgRedBright(
        "Error in getProfileByIdController in auth.controller.js ---->> ",
        error
      )
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error !!",
      error: "Error in getProfileByIdController in auth.controller.js",
    });
  }
};


// logout controller
export const logoutController = async(req,res) =>{
  try {
    res.cookie('userToken', null,  { expires: new Date(Date.now()) })
    return res.status(200).json({success:true, message:'User logout successfully'})
  } catch (error) {
    // Handle other errors
    console.log(
      chalk.bgRedBright(
        "Error in logoutController in auth.controller.js ---->> ",
        error
      )
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error !!",
      error: "Error in logoutController in auth.controller.js",
    });
  }
}
