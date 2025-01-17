export default {
  root: "/",
  about: "/about",
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
    checkout: "/app/checkout",
    addresses: "/app/addresses",
    newAddress: "/app/addresses/new",
    order: (id: string | number) => `/app/orders/${id}`,
    address: (id: string | number) => `/app/addresses/${id}`,
  },
  admin: {
    home: "/admin",
    users: "/admin/users",
    orders: "/admin/orders",
    profile: "/admin/profile",
    products: "/admin/products",
    categories: "/admin/categories",
    newUser: "/admin/users/new",
    newProduct: "/admin/products/new",
    user: (id: string | number) => `/admin/users/${id}`,
    order: (id: string | number) => `/admin/orders/${id}`,
    product: (id: string | number) => `/admin/products/${id}`,
    category: (id: string | number) => `/admin/categories/${id}`,
  },
};
