import withAuth from "./middlewares/withAuth";
import { NextResponse } from "next/server";

export function mainMiddleware() {
  const res = NextResponse.next();
  return res;

  // return NextResponse.next();
}

export default withAuth(mainMiddleware, [
  "/profile",
  "/dashboard",
  "/my-blogs",
  "/favorite",
  "/add-new-blog",
]);
