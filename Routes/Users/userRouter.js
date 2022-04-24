const validateRegistration = require("./usersValidations/registraion");
const validateSignin = require("./usersValidations/signIn");
const {
  comparePassword,
  generateHashPassword,
} = require("../../services/bcrypt");
const { generateAuthToken } = require("../../services/token");
const _ = require("lodash");
const router = require("express").Router();
const User = require("./userModel");
const auth = require("../../middlewares/authorization");

router.post("/register", async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(
    _.pick(req.body, ["name", "email", "password", "biz", "cards"])
  );

  user.password = generateHashPassword(user.password);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

router.post("/login", async (req, res) => {
  const { error } = validateSignin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = comparePassword(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  res.json({
    token: generateAuthToken(user),
  });
});

router.get("/userInfo", auth, (req, res) => {
  let user = req.user;

  User.findById(user._id)
    .select(["-password", "-createdAt", "-__v"])
    .then((user) => res.json(user))
    .catch((errorsFromMongoose) => res.status(500).json(errorsFromMongoose));
});

module.exports = router;
