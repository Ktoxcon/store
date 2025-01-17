import { User } from "@store/models/user.model";
import { hash } from "argon2";
import { UserRoles } from "../constants/roles";
import { UserStatus } from "../constants/user-status";

export async function createRootUser() {
  const password = await hash(process.env.ROOT_PASSWORD!);

  const rootExists = await User.findByPk(1);

  if (rootExists) return;

  await User.create({
    id: 1,
    password,
    name: "Root",
    lastName: "",
    status: UserStatus.ACTIVE,
    userRole: UserRoles.ADMIN,
    email: process.env.ROOT_EMAIL,
  });
}
