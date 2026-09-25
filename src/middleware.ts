import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const user = process.env.DASHBOARD_USER;
  const password = process.env.DASHBOARD_PASSWORD;

  if (user && password) {
    const auth = request.headers.get("authorization");
    if (auth === `Basic ${btoa(`${user}:${password}`)}`) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Accès refusé", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Dashboard", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
