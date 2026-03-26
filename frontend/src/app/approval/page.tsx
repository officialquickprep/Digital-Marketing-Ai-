import ApprovalQueue from '@/components/approval/Queue';

export default function ApprovalPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Content Approval Queue</h1>
          <p className="text-slate-600 mt-1">Review the AI-generated posts before they are published to your social channels.</p>
        </div>
        <ApprovalQueue />
      </div>
    </div>
  );
}
