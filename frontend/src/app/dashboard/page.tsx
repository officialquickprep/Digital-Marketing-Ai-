import DashboardView from '@/components/dashboard/DashboardView';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Campaign Analytics</h1>
          <p className="text-slate-600 mt-1">Real-time overview of AI performance, ad spend, and lead conversion.</p>
        </div>
        <DashboardView />
      </div>
    </div>
  );
}
