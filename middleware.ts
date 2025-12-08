import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const cookieLocale = req.cookies.get("locale")?.value || "en";

  const res = NextResponse.next();
  res.cookies.set("locale", cookieLocale); 
  return res;
}
