export default {
  root: "/",
  auth: {
    signin: "/auth/signin",
    signup: "/auth/signup",
    signout: "/auth/signout",
    resetPassword: "/auth/forgot-password",
  },
  customer: {
    home: "/app",
    orders: "/app/orders",
    profile: "/app/profile",
    addresses: "/app/addresses",
    order: (id: string) => `/app/order/${id}`,
    address: (id: string) => `/app/address/${id}`,
  },
  admin: {
    home: "/admin",
    users: "/admin/users",
    orders: "/admin/orders",
    profile: "/admin/profile",
    products: "/admin/products",
    categories: "/admin/categories",
    order: (id: string) => `/admin/order/${id}`,
    product: (id: string) => `/admin/product/${id}`,
    category: (id: string) => `/admin/category/${id}`,
  },
};
