import { notFound } from "next/navigation";

// In production, Next.js calls the Node.js API which natively queries the PostgreSQL `Business` table matching this subdomain wildcard
async function getTenantData(domain: string) {
  // Mock API fallback resolving the tenant branding mathematically based on their CRM data
  if (domain === "demo") {
    return {
      name: "Acme Corp Marketing",
      primaryColor: "#ef4444", // Tailwind Red-500
      logoUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop"
    };
  }
  return null;
}

export default async function TenantPage({ params }: { params: { domain: string } }) {
  // Actively unpack the `[domain]` wildcard parameter intercepted by Vercel's Edge Middleware
  const tenant = await getTenantData(params.domain);

  if (!tenant) {
    return notFound();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 transition-colors duration-500">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-lg w-full text-center border-t-8" style={{ borderTopColor: tenant.primaryColor }}>
        
        {tenant.logoUrl ? (
          <img src={tenant.logoUrl} alt={`${tenant.name} Logo`} className="w-24 h-24 mx-auto rounded-full object-cover mb-6 shadow-md border-4 border-slate-50" />
        ) : (
          <div className="w-24 h-24 mx-auto bg-slate-200 rounded-full mb-6"></div>
        )}
        
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2" style={{ color: tenant.primaryColor }}>
          {tenant.name}
        </h1>
        <p className="text-slate-500 mb-8 font-medium tracking-wide uppercase text-xs border border-slate-200 inline-block px-3 py-1 rounded-full bg-slate-50">
          Autonomous Client Portal
        </p>
        
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Client Dedicated Username" 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 transition-all" 
          />
          <input 
            type="password" 
            placeholder="Secure Password" 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 transition-all"
          />
          <button 
            className="w-full py-4 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            style={{ backgroundColor: tenant.primaryColor }}
          >
            Access Agency AI Architecture
          </button>
        </div>
        
        <p className="mt-8 text-xs text-slate-400 font-mono">
          Powered secretly by Digital AI Engine.
        </p>
      </div>
    </div>
  );
}
