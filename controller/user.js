const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../model/user");

const signUp = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    console.log(req.body);

    const user = req.body;
    user.role = "VIEWER";
    await UserModel.create(user);
    res.status(201).json({
      status: "success",
      message: "User created successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail to create user",
      message: err.message,
    });
  }
};

const logIn = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const isPasswordSame = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordSame) throw new Error();

    const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
    const expiryTimeInSeconds = currentTimeInSeconds + 3600; // 1hr from now

    const jwtPayload = {
      userId: user._id,
      role: user.role,
      mobileNo: user.mobileNo,
      exp: expiryTimeInSeconds,
    }

    const token = jwt.sign(jwtPayload, "MY_SECRET_KEY");
    await UserModel.findByIdAndUpdate(user._id, { $set: { token } });

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      token: token,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid username or password",
    });
  }
};

const users = (req,res)=>{
  res.status(200).json({
    status : "success",
    message : req.user, 
  })
}

const userController  = { signUp, logIn, users };

module.exports = userController;
