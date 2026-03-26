'use client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, Users, Activity, DollarSign } from 'lucide-react';

const mockChartData = [
  { name: 'Mon', roas: 2.1, spend: 50 },
  { name: 'Tue', roas: 2.4, spend: 65 },
  { name: 'Wed', roas: 2.8, spend: 55 },
  { name: 'Thu', roas: 3.5, spend: 80 },
  { name: 'Fri', roas: 4.2, spend: 75 },
  { name: 'Sat', roas: 4.8, spend: 90 },
  { name: 'Sun', roas: 5.1, spend: 110 },
];

const mockLeadsData = [
  { platform: 'Google Places', leads: 420 },
  { platform: 'Instagram (Apify)', leads: 680 },
  { platform: 'Meta Ads', leads: 850 },
  { platform: 'Omixa AI Chat', leads: 230 },
];

export default function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Avg. ROAS</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">4.2x</h3>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-lg"><ArrowUpRight size={20}/></div>
          </div>
          <p className="text-xs text-green-600 mt-4 flex items-center gap-1 font-semibold">+12% from last week</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
           <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Leads Found</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">2,180</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Users size={20}/></div>
          </div>
          <p className="text-xs text-slate-500 mt-4">Across all 4 discovery channels</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
           <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Active Ad Spend</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">$525.00</h3>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><DollarSign size={20}/></div>
          </div>
          <p className="text-xs text-slate-500 mt-4">Strict $5/day auto-optimization active</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
           <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Content AI Status</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">98%</h3>
            </div>
            <div className="p-3 bg-orange-50 text-orange-500 rounded-lg"><Activity size={20}/></div>
          </div>
          <p className="text-xs text-slate-500 mt-4">12 Posts waiting in Approval Queue</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-bold text-slate-800">ROAS vs Campaign Spend</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRoas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="roas" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRoas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-bold text-slate-800">Lead Sources</h3>
          </div>
          <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={mockLeadsData} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0"/>
                 <XAxis type="number" fontSize={12} stroke="#94a3b8" tickLine={false} axisLine={false}/>
                 <YAxis dataKey="platform" type="category" width={110} fontSize={12} stroke="#64748b" tickLine={false} axisLine={false}/>
                 <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                 <Bar dataKey="leads" fill="#8b5cf6" radius={[0, 4, 4, 0]} maxBarSize={40} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
