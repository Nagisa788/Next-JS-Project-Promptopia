import mongoose from "mongoose";

let isConnected = false; //to track db connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true); //to avoid getting warnings in the console

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true, //recommended option
      useUnifiedTopology: true, //recommended option
    });

    isConnected = true;

    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};
