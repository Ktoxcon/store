import type { Address } from "./address";
import type { OrderItem } from "./order-item";

export type Order = {
  id: number;
  userId: number;
  addressId: number;
  total: number;
  status: string;
  deliveryStatus: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  Address: Address;
  OrderItems: OrderItem[];
};
