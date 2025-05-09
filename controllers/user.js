const { User } = require("../models");
const bcrypt = require("bcrypt");
const { setUser } = require("../services/jwt");

/* *********************S I G N U P********************************* */

const userSignup = async (req, res) => {
  console.log("entered");
  const { name, email, password, phone } = req.body;

  if (!email || !password || !name || !phone) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required." });
  }

  if (phone.length != 10 || !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ message: "Invalid phone number." });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(500).json({
        success: false,
        message: "User already Exists",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

/* **************************** L O G I N ********************************************* */

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        message: " No user found ",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const authenticationToken = setUser(user);

    return res.status(200).json({
      message: "Logged in successfully.",
      token: authenticationToken,
      userId: user.id,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/* *********************************** Get Users ******************************* */

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve users.",
      error: error.message,
    });
  }
};

const userLoginStatus = (req, res) => {
  return res.status(200).json({ message: "user is loggedin", user: req.user });
};

module.exports = { userSignup, userLogin, getAllUsers, userLoginStatus };
