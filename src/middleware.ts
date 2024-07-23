import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const allowedOrigins = [
  process.env.SOLVER_RELAY_0_URL ?? "https://solver-relay.chaindefuser.com/rpc",
]

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin") ?? ""

  const isAllowedOrigin = allowedOrigins.includes(origin)

  const isPreflight = request.method === "OPTIONS"

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }

  const response = NextResponse.next()

  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin)
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: [
    "/",
    "/swap/:path*",
    "/deposit/:path*",
    "/withdraw/:path*",
    "/wallet/:path*",
    "/jobs/:path*",
  ],
}
