import mongoose from "mongoose";
import app from "./app";
import Config from "./app/Config";

async function main() {
  await mongoose.connect(Config.DB_URL as string);
  console.log("Database connected");
  app.listen(Config.PORT, () => {
    console.log(`Server is running on port ${Config.PORT}`);
  });
}
main();
