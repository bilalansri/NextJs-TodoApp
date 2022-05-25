import dbConnect from "../../../utils/dbConnect";
import UserModel from "../../../models/UserSchema";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await UserModel.find();

        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        let NewUser = new UserModel();
        let euser = await UserModel.findOne({ email: req.body.email });

        if (euser) {
          res.status(201).json({ success: true, data: euser });
        } else {
          NewUser.username = req.body.username;
          NewUser.email = req.body.email;
          NewUser.password = req.body.password;

          let dbuser = await NewUser.save();

          res.json(dbuser);
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        const user = await UserModel.findOne({
          email: req.body.email,
          password: req.body.password,
        });

        const secretKey = "ABCD";

        if (user) {
          const token = sign(
            {
              exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 30),
              id: user._id,
            },
            secretKey
          );

          const serialized = serialize("JWT", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 30,
            sameSite: "strict",
            path: "/",
          });

          res.setHeader("Set-Cookie", serialized);
          res.status(200).json({ data: "success" });
        } else {
          res.status(400).json({ success: false });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
