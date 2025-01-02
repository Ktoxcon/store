export type User = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  picture: string | null;
  phone: string | null;
  userRole: "customer" | "admin";
  createdAt: string;
  updatedAt: string;
};
