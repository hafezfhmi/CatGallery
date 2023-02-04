const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");

const { User, PasswordReset } = require("../models");
const { GMAIL_EMAIL, GMAIL_SECRETS } = require("../utils/config");

// Setting up transporter using gmail: https://www.youtube.com/watch?v=thAP7Fvrql4
// P.S. Using gmail is not recommended for production. Find other alternative for production.
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_SECRETS,
  },
});

exports.getRelog = (req, res) =>
  res.json({
    user: req.session.user,
  });

exports.getResetPassword = async (req, res, next) => {
  const { resetToken } = req.params;

  try {
    const resetTokenDetails = await PasswordReset.findOne({
      where: {
        resetToken,
        expiry: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (!resetTokenDetails) {
      throw new Error("Invalid reset token");
    }

    return res.status(200).json({ message: "Reset token is valid" });
  } catch (error) {
    return next(error);
  }
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userDetails = await User.findOne({ where: { email } });

    const isPassword =
      userDetails == null
        ? false
        : await bcrypt.compare(password, userDetails.password);

    if (!isPassword) {
      throw new Error("Invalid email or password");
    }

    req.session.isLoggedIn = true;
    req.session.user = {
      id: userDetails.id,
      username: userDetails.username,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
    };

    return res.json({
      user: {
        username: userDetails.username,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
      },
      isLoggedIn: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    return next(error);
  }
};

exports.postLogout = async (req, res, next) => {
  try {
    req.session.destroy(() => {
      res.status(200).json({ message: "User logged out" });
    });
  } catch (error) {
    next(error);
  }
};

exports.postSignup = async (req, res, next) => {
  const { username, firstName, lastName, email, password, confirmPassword } =
    req.body;

  try {
    // Check password
    if (password !== confirmPassword) {
      throw new Error("Password doesn't match");
    }

    // Check if user is already in db via email
    let foundUser = await User.findOne({ where: { email } });
    if (foundUser) {
      throw new Error("There's already a user with that email");
    }

    // Check if user is already in db via username
    foundUser = await User.findOne({ where: { username } });
    if (foundUser) {
      throw new Error("There's already a user with that username");
    }

    // Check if username is valid
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      throw new Error(
        "Invalid username. Username must contains only alphabetical characters and numbers"
      );
    }

    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created",
    });
  } catch (error) {
    return next(error);
  }
};

exports.postResetPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const userDetails = await User.findOne({ where: { email } });

    if (!userDetails) {
      throw new Error("User not found");
    }

    const hashBuffer = crypto.randomBytes(32);
    const token = hashBuffer.toString("hex");

    const resetTokenDetails = await PasswordReset.findOne({
      where: { userId: userDetails.id },
    });

    if (resetTokenDetails) {
      const currentDate = new Date();
      const resetTokenExpiryLeft = Math.floor(
        (resetTokenDetails.expiry - currentDate) / 60000
      );

      if (resetTokenExpiryLeft > 0) {
        throw new Error(
          `You had requested a password reset earlier. Please try again in ${resetTokenExpiryLeft} minutes.`
        );
      }

      // Update token and return response
      await PasswordReset.update(
        {
          resetToken: token,
          expiry: Date.now() + 3600000,
        },
        { where: { userId: userDetails.id } }
      );
    } else {
      await PasswordReset.create({
        resetToken: token,
        expiry: Date.now() + 3600000,
        userId: userDetails.id,
      });
    }

    await transporter.sendMail({
      from: GMAIL_EMAIL,
      to: email,
      subject: "Password reset",
      text: `Here's the link to reset your password: http://localhost:3000/passwordReset/${token}`,
    });

    return res
      .status(200)
      .json({ message: "Reset link has been sent to your email" });
  } catch (error) {
    return next(error);
  }
};

exports.postNewPassword = async (req, res, next) => {
  const { resetToken } = req.params;
  const { password, confirmPassword } = req.body;

  try {
    const resetTokenDetails = await PasswordReset.findOne({
      where: {
        resetToken,
        expiry: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (!resetTokenDetails) {
      throw new Error("Invalid token");
    }

    // Check password
    if (password !== confirmPassword) {
      throw new Error("Password doesn't match");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          id: resetTokenDetails.userId,
        },
      }
    );

    await PasswordReset.destroy({
      where: {
        resetToken,
      },
    });

    return res.status(200).json({ message: "Password updated" });
  } catch (error) {
    return next(error);
  }
};
