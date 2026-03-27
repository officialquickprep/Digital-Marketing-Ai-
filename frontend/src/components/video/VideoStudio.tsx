'use client';
import { useState } from 'react';
import { Play, Clapperboard, MonitorPlay, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const avatars = [
  { id: 'av_1', name: 'Sarah (Professional)', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop' },
  { id: 'av_2', name: 'Marcus (Casual)', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop' },
  { id: 'av_3', name: 'Luna (Energetic)', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop' },
];

export default function VideoStudio() {
  const [selectedAvatar, setSelectedAvatar] = useState('av_1');
  const [script, setScript] = useState("Hey everyone! We're running a massive 50% off special this weekend only. Drop by and let's crush those fitness goals together!");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // API Route mapping to Python ai_service logic (HeyGen/RunwayML)
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedVideo('https://www.w3schools.com/html/mov_bbb.mp4'); // Standard HTTP mock payload callback
    }, 4500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Configuration Panel */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><MonitorPlay size={20}/> 1. Select AI Avatar</h3>
          <div className="space-y-3">
            {avatars.map(avatar => (
              <div 
                key={avatar.id} 
                onClick={() => setSelectedAvatar(avatar.id)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${selectedAvatar === avatar.id ? 'bg-blue-50 border-blue-200 border ring-1 ring-blue-500' : 'hover:bg-slate-50 border border-transparent'}`}
              >
                <img src={avatar.img} alt={avatar.name} className="w-12 h-12 rounded-full object-cover" />
                <span className="font-medium text-slate-700">{avatar.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Clapperboard size={20}/> 2. Input Script</h3>
          <textarea 
            rows={6}
            className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 leading-relaxed resize-none"
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Type the script for the avatar to read..."
          />
        </div>

        <button 
          onClick={handleGenerate}
          disabled={isGenerating || !script}
          className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all duration-300 disabled:bg-slate-400 flex justify-center items-center gap-2 shadow-lg shadow-slate-900/20"
        >
          {isGenerating ? <Sparkles size={20} className="animate-spin" /> : <Play size={20} className="ml-1"/>}
          {isGenerating ? 'Rendering Neural Audio...' : 'Generate AI Reel'}
        </button>
      </div>

      {/* Main Preview Monitor */}
      <div className="lg:col-span-2 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative min-h-[600px] flex items-center justify-center border-4 border-slate-800 ring-4 ring-slate-900/30">
        {!generatedVideo && !isGenerating && (
           <div className="text-center text-slate-500 p-10">
             <div className="inline-flex p-4 rounded-full bg-slate-800 mb-6">
                <MonitorPlay size={48} className="text-slate-400" />
             </div>
             <p className="text-2xl font-bold text-slate-300">Video Preview Window</p>
             <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">Select an avatar and inject your script into the left panel. Click generate to construct an AI-generated MP4.</p>
           </div>
        )}

        {isGenerating && (
           <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-center text-blue-400">
              <Sparkles size={64} className="mx-auto mb-4 animate-[spin_3s_linear_infinite]" />
              <p className="text-2xl font-bold animate-pulse text-white">Synthesizing Lip-Sync Graphics...</p>
              <div className="w-64 h-2 bg-slate-800 rounded-full mt-6 mx-auto overflow-hidden">
                <div className="h-full bg-blue-500 animate-[pulse_2s_ease-in-out_infinite] w-full origin-left scale-x-75"></div>
              </div>
              <p className="mt-4 text-xs font-mono text-slate-500 uppercase tracking-widest">Compiling HD Output via HeyGen API</p>
           </motion.div>
        )}

        {generatedVideo && !isGenerating && (
          <motion.div initial={{opacity: 0, scale: 0.95}} animate={{opacity: 1, scale: 1}} className="w-full h-full p-2 flex items-center justify-center bg-black">
             <video 
               src={generatedVideo} 
               controls 
               autoPlay 
               className="w-full h-auto max-h-[750px] object-contain rounded-xl shadow-2xl border border-slate-800"
             />
          </motion.div>
        )}
      </div>
    </div>
  );
}
