import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose
    .connect(
// Add MongoDB Link
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    )

    connection.isConnected = db.connections[0].readyState
    console.log(connection.isConnected)
}

export default dbConnect
