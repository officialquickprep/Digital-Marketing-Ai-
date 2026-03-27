import VideoStudio from '@/components/video/VideoStudio';

export default function VideoAgentPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">AI Video Studio</h1>
          <p className="text-slate-600 mt-1">Convert your finalized text scripts into highly engaging, lip-synced AI Avatar Reels.</p>
        </div>
        <VideoStudio />
      </div>
    </div>
  );
}
