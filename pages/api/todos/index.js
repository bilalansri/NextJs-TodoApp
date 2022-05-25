import dbConnect from "../../../utils/dbConnect";
import ToDoModel from "../../../models/ToDoSchema";
import verify from "jsonwebtoken/verify";

dbConnect();

export default async (req, res) => {
  const { method, cookies } = req;

  switch (method) {
    case "POST":
      try {
        const { text, logid } = req.body;

        const TOdo = new ToDoModel({
          text: text,
          userId: logid,
        });

        TOdo.save();

        res.status(200).json({ success: true, data: TOdo });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "GET":
      try {
        const jwt = cookies.JWT;

        const secretKey = "ABCD";

        if (!jwt) {
          res.json({ data: "Invalid Token" });
        } else {
          const user = verify(jwt, secretKey);
          const ToDo = await ToDoModel.find({ userId: user.id });

          res.status(200).json({ success: true, data: ToDo });
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
