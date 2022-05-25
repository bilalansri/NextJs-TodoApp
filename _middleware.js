import { NextResponse } from "next/server";
import {verify} from "jsonwebtoken";

// Not Used Right Now Just for Saving it Beacuse We got error 
// For use just move this file into pages or api
// made for protecting Routes

export function middleware (req) {
  const { cookies } = req;

  const url = req.url;
  console.log(url)

  const jwt = cookies.JWT;

  const secretKey = "ABCD";

  if (url == "/login") {
    if (jwt) {
      try {
        verify(jwt, secretKey);

        return NextResponse.redirect("/");
      } catch (error) {
        return NextResponse.next();
      }
    }
  }
  return NextResponse.next();
};
