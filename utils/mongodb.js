import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

// check the MongoDB URI
if (!MONGODB_URI) {
  throw new Error("Define the MONGODB_URI environmental variable");
}
const cached = global.mongoose
  ? global.mongoose
  : (global.mongoose = { conn: null, promise: null });

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      mongoose.set("strictQuery", true);

      return mongoose;
    });
  }
  cached.conn = await cached.promise;

  return cached.conn;
}
