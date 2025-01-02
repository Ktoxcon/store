import { createCookieSessionStorage } from "react-router";

export const profileCookie = createCookieSessionStorage({
  cookie: {
    name: "profile",
  },
});
