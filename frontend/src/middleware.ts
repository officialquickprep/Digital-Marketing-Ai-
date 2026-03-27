import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Matcher Configuration ensures Next.js internal files are explicitly bypassed to save computational routing cycles
export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // Extract incoming Vercel hostname (e.g., app.agency.com, acmecorp.digitalai.io, localhost:3000)
  const hostname = req.headers.get("host")!;

  // We explicitly define our base monolithic application domains
  const appDomains = ["localhost:3000", "digitalai.io", "www.digitalai.io", "vercel.app"];

  // Logic to calculate if the inbound traffic is targeting a bespoke white-label wildcard subdomain
  // e.g. "acme-corp.digitalai.io" -> Extracted customSubDomain = "acme-corp"
  let customSubDomain = null;
  
  // Edge-case wildcard algorithmic parsing:
  if (!appDomains.some(domain => hostname.includes(domain)) || (hostname.includes('.localhost:3000'))) {
    customSubDomain = hostname.split('.')[0];
  } else if (hostname.endsWith('.digitalai.io') && hostname !== 'www.digitalai.io') {
    customSubDomain = hostname.replace('.digitalai.io', '');
  }

  if (customSubDomain) {
    // Invisibly rewrite the URL logic directly to the dynamic `[domain]` App Router folder 
    console.log(`[Edge Middleware] Autonomously routed White-Label Tenant: ${customSubDomain}`);
    return NextResponse.rewrite(new URL(`/${customSubDomain}${url.pathname}`, req.url));
  }

  // Unmodified pass-through for default parent domain logic
  return NextResponse.next();
}
