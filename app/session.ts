// app/sessions.ts
import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  email: string;
};

type SessionFlashData = {
  error: string;
  message: {
    title: string;
    description?: string;
    status: string;
  };
};

const secret = "asfafasfasjfhasf";
if (!secret) {
  throw new Error("No session secret provided");
}


export const { getSession, commitSession, destroySession } = createCookieSessionStorage<SessionData, SessionFlashData>({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    name: "psgh-admion-session",
    httpOnly: true,
    maxAge: 60 * 60 * 45,
    path: "/",
    sameSite: "lax",
    secrets: [secret],
  },
});
