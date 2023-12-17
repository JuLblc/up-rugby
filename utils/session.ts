import { UserRole } from "../constants";

export const isAdmin = (role: "ADMIN" | "USER" | undefined) => {
  return role === UserRole.ADMIN;
};
