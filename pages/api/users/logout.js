import { serialize } from "cookie";

export default async (req, res) => {
  const { cookies } = req;

  const jwt = cookies.JWT;

  if (!jwt) {
    return res.json({ data: "Already Logged In" });
  } else {
    const serialized = serialize("JWT", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    res.status(201).json({ data: "Logged Out" });
  }
};
