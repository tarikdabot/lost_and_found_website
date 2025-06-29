const User = require("../models/user-model.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require("../util/error.js");

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password || username.trim() === "" || email.trim() === "" || password.trim() === "") {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        // Hash the password before saving
        const hashedPassword = await bcryptjs.hash(password, 10); // 10 is the salt rounds

        const newUser = new User({
            username,
            email,
            password: hashedPassword, // Use the hashed password
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with a success message
        res.status(201).json({ message: "Signup is successful" });
    } catch (error) {
        next(error); // Handle errors (e.g., unique constraint violations)
    }
};

const signin = async (req, res, next) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password || email.trim() === "" || password.trim() === "") {
        return next(errorHandler(400, "All fields are required"));
    }

    try {
        // Find the user by email
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(400, "User not found"));
        }

        // Compare the provided password with the stored hashed password
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, "Invalid password"));
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: validUser._id },
            process.env.jwt_secret, // Use the correct env variable for JWT secret

            // { expiresIn: "1h" } 

            // Token expires in 1 hour
        );
        const {password:pass,...rest}=validUser._doc;

        // Send the token in a cookie
        res.status(200)
            .cookie("access_token", token, {
                httpOnly: true, // Correctly set httpOnly to true for security
                secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            })
            .json({
                message: "Login successful",
                user:rest
            });

    } catch (error) {
        next(error); // Handle potential errors
    }
};

 const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET
        );
        const { password, ...rest } = user._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            name.toLowerCase().split(' ').join('') +
            Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture: googlePhotoUrl,
        });
        await newUser.save();
        const token = jwt.sign(
          { id: newUser._id, isAdmin: newUser.isAdmin },
          process.env.JWT_SECRET
        );
        const { password, ...rest } = newUser._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };

  module.exports = { signup, signin, google };

