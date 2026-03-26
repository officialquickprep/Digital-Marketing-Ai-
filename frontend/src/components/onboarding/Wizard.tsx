'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, MessageSquare, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    location: '',
    targetAudience: '',
    toneOfVoice: 'Professional',
  });

  const updateForm = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const submitToAI = async () => {
    // We will connect this to main_api in the next backend step
    console.log("Submitting to AI Core...", formData);
    nextStep();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      {/* Progress Bar */}
      <div className="flex border-b border-slate-100">
        {[1, 2, 3].map(i => (
          <div key={i} className={`flex-1 h-2 ${step >= i ? 'bg-blue-600' : 'bg-slate-100'} transition-all duration-300`} />
        ))}
      </div>

      <div className="p-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Briefcase size={24}/></div>
                <h2 className="text-2xl font-bold text-slate-800">The Basics</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
                  <input type="text" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Luigi's Pizza" value={formData.businessName} onChange={e => updateForm('businessName', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Industry</label>
                  <select className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.industry} onChange={e => updateForm('industry', e.target.value)}>
                    <option value="">Select Industry</option>
                    <option value="Restaurant">Restaurant / Cafe</option>
                    <option value="Gym">Gym / Fitness</option>
                    <option value="Salon">Salon / Spa</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><MapPin size={24}/></div>
                <h2 className="text-2xl font-bold text-slate-800">Audience & Location</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Primary Location (City/Neighborhood)</label>
                  <input type="text" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Jubilee Hills, Hyderabad" value={formData.location} onChange={e => updateForm('location', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience Profile</label>
                  <textarea rows={3} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Young professionals aged 25-40 looking for quick, healthy lunches..." value={formData.targetAudience} onChange={e => updateForm('targetAudience', e.target.value)} />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-50 text-green-600 rounded-lg"><MessageSquare size={24}/></div>
                <h2 className="text-2xl font-bold text-slate-800">Brand Identity</h2>
              </div>
              <div className="space-y-4">
                 <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tone of Voice (For AI Generated Content)</label>
                  <select className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.toneOfVoice} onChange={e => updateForm('toneOfVoice', e.target.value)}>
                    <option value="Professional & Trustworthy">Professional & Trustworthy</option>
                    <option value="Friendly & Casual">Friendly & Casual</option>
                    <option value="Humorous & Witty">Humorous & Witty</option>
                    <option value="Luxurious & Exclusive">Luxurious & Exclusive</option>
                  </select>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-600">
                  <p>When you click <strong>Generate ICP</strong>, the AI Orchestrator will analyze these inputs, scan competitors in your area, and build your <strong>Ideal Customer Profile</strong> into the Vector Database.</p>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="stepinfo" className="text-center py-10" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Analyzing Data...</h2>
              <p className="text-slate-500">The Business Intelligence Agent is building your ICP now.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step < 4 && (
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between">
          <button onClick={prevStep} disabled={step === 1} className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${step === 1 ? 'text-slate-400 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-200'}`}>
            <ArrowLeft size={18} /> Back
          </button>
          {step < 3 ? (
            <button onClick={nextStep} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Next Step <ArrowRight size={18} />
            </button>
          ) : (
            <button onClick={submitToAI} className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-md focus:ring-2 focus:ring-slate-900 focus:ring-offset-2">
              Generate ICP 
            </button>
          )}
        </div>
      )}
    </div>
  );
}
