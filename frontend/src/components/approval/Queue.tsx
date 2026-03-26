'use client';
import { useState } from 'react';
import { Check, X, Edit, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mockPosts = [
  {
    id: '1',
    body: "Ready to crush your fitness goals? Join us at Iron Gym this week for a free trial session! Let's build the best version of you together. 💪🔥 #Fitness #IronGym #FreeTrial",
    mediaUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
    platform: "Instagram",
    status: "draft"
  },
  {
    id: '2',
    body: "Behind the scenes with our expert trainers mapping out the ultimate summer shred program. Who's ready? 🏋️‍♀️ #BehindTheScenes #TrainerLife",
    mediaUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop",
    platform: "Facebook",
    status: "draft"
  }
];

export default function ApprovalQueue() {
  const [posts, setPosts] = useState(mockPosts);

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    setPosts(current => current.filter(post => post.id !== id));
    console.log(`Post ${id} was ${action}d!`);
    // In production: send API request to main_api to update DB status
  };

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {posts.length === 0 && (
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-center py-20 bg-white rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-700">All Caught Up!</h3>
            <p className="text-slate-500 mt-2">The AI is currently generating your next batch of content.</p>
          </motion.div>
        )}
        
        {posts.map((post) => (
          <motion.div 
            key={post.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row"
          >
            {/* Image Preview */}
            <div className="md:w-1/3 bg-slate-100 flex items-center justify-center relative min-h-[250px]">
              {post.mediaUrl ? (
                <img src={post.mediaUrl} alt="AI Generated" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <ImageIcon className="text-slate-300" size={48}/>
              )}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                {post.platform}
              </div>
            </div>

            {/* Content & Actions */}
            <div className="p-6 md:w-2/3 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">AI Draft</span>
                  <button className="text-slate-400 hover:text-slate-600"><Edit size={18}/></button>
                </div>
                <p className="text-slate-800 text-lg leading-relaxed">{post.body}</p>
              </div>

              <div className="flex gap-3 mt-8">
                <button 
                  onClick={() => handleAction(post.id, 'reject')}
                  className="flex-1 py-3 px-4 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-colors flex justify-center items-center gap-2"
                >
                  <X size={20}/> Reject & Regenerate
                </button>
                <button 
                  onClick={() => handleAction(post.id, 'approve')}
                  className="flex-1 py-3 px-4 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors flex justify-center items-center gap-2 shadow-sm"
                >
                  <Check size={20}/> Approve for Publishing
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
