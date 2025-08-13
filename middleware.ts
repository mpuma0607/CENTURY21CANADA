import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Domain to tenant mapping - Phase 2: Adding test subdomains
const domainTenantMap: Record<string, string> = {
  // Empower AI domains (sample domains to prevent interference with live platform)
  "sample-empower-ai.com": "empower-ai",
  "www.sample-empower-ai.com": "empower-ai",
  "empowerai.localhost": "empower-ai",

  // Empower AI Beta domains (sample domains to prevent interference with live platform)
  "sample-empoweraibeta.com": "empower-beta",
  "www.sample-empoweraibeta.com": "empower-beta",
  "empoweraibeta.localhost": "empower-beta",

  // Century 21 Beggins domains (sample domains to prevent interference with live platform)
  "sample-beggins.com": "century21-beggins",
  "www.sample-beggins.com": "century21-beggins",
  "sample-beggins.localhost": "century21-beggins",
  "sample-begginsuniversity.com": "century21-beggins",
  "www.sample-begginsuniversity.com": "century21-beggins",
  "sample-begginsagents.com": "century21-beggins",
  "www.sample-begginsagents.com": "century21-beggins",
  "sample-beggins.thenextlevelu.com": "century21-beggins",

  // Century 21 Canada domains
  "empowerc21canada.com": "century21-canada",
  "www.empowerc21canada.com": "century21-canada",
  "century21canada.thenextlevelu.com": "century21-canada",

  // International domains
  "international.com": "international",
  "www.international.com": "international",
  "international.localhost": "international",

  // Brokerage Private domains
  "brokerage.com": "brokerage-private",
  "www.brokerage.com": "brokerage-private",
  "brokerage.localhost": "brokerage-private",
}

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || ""

  console.log(`[Middleware] Checking hostname: ${hostname}`)

  // Get tenant from domain mapping
  let tenant = domainTenantMap[hostname]

  // If no exact match, try partial matching for development
  if (!tenant) {
    if (hostname.includes("sample-empoweraibeta")) {
      tenant = "empower-beta"
    } else if (hostname.includes("sample-empower-ai")) {
      tenant = "empower-ai"
    } else if (hostname.includes("sample-beggins")) {
      tenant = "century21-beggins"
    } else if (hostname.includes("empowerc21canada")) {
      tenant = "century21-canada"
    } else if (hostname.includes("international")) {
      tenant = "international"
    } else if (hostname.includes("brokerage")) {
      tenant = "brokerage-private"
    } else {
      tenant = "default"
    }
  }

  // Add tenant to headers
  const response = NextResponse.next()
  response.headers.set("x-tenant", tenant)

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
