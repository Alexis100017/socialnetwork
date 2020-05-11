const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
//  api/users
// this will be a public API
//test endpoint
//router.get("/", (req, res) => res.send("user route"));

//@route    POST api/users
//@desc     Register user
//@Access   Public
//router.post == app.post
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    //  console.log(req.body); this is the object of data that is going to be sent to this route
    const errors = validationResult(req); //this is an object that have any msg error
    // console.error("errorjjeje:" + errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // send a responses in json format, The parameter can be any JSON type, including object, array, string, Boolean, number, or null, and you can also use it to convert other values to JSON.
    }
    const { name, email, password } = req.body;

    try {
      // if user exists send back an error
      let user = await User.findOne({ email }); //returns only one document that satisfies the criteria entered. If the criteria entered matches for more than one document, the method returns only one document according to natural ordering,
      // console.error("user" + user); //if there is one user with the same email will have an object, else will be null
      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }
      //get users gravatar
      const avatar = gravatar.url(email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm", //default image if there was no picture
      });

      //create a  new instance, it will be need user.save in order to save in the server

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //encrypt user's pwd

      const salt = await bcrypt.genSalt(10); //10 rounds, which is how many times will do the process, he cost of processing the data.
      user.password = await bcrypt.hash(password, salt); //get the plain password passed in the request
      await user.save(); //this will save the new user in mongo

      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id, //actually is _id, however using moongose it's not necesary
          //    password: user.password,
        },
      };
      //the token is created with the id user, if there is more data, addd in the payload
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      //res.send("user registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    }
  }
);

//by using postman and setting up a content type of json, we can
//send raw data to the sv, and console.log(req.body) will have that raw data
module.exports = router;
