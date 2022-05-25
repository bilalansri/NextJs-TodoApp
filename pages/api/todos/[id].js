import dbConnect from "../../../utils/dbConnect";
import ToDoModel from "../../../models/ToDoSchema";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {

    case "PUT":
      try {
        const { text } = req.body;

        const updat = await ToDoModel.findByIdAndUpdate(
          id,
          { text },
          { runValidators: true, new: true }
        );

        if (!updat) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: updat });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const del = await ToDoModel.findByIdAndDelete(id);

        if (!del) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
