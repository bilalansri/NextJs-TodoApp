import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose
    .connect(
      "mongodb+srv://admin:nimda@cluster0.h7ye9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    )

    connection.isConnected = db.connections[0].readyState
    console.log(connection.isConnected)
}

export default dbConnect
