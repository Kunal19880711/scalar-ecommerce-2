import bcrypt from "bcryptjs";
import User from "models/UserSchema";

export async function up() {
  const initialAdmin = {
    name: "Admin",
    email: "kunalpalprojects+admin@gmail.com",
    password: await bcrypt.hash("admin", 10),
    role: "admin",
  };
  const user = await new User(initialAdmin);
  await user.save();
  const users = await User.find();
  console.log("Current list of all users:");
  console.log(users);
}

export async function down() {
  await User.deleteMany({});
}
