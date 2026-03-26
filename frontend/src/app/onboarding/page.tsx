import OnboardingWizard from '@/components/onboarding/Wizard';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">AI Agent Initialization</h1>
          <p className="text-lg text-slate-600 mt-2">Let's build your brand's intelligence core.</p>
        </div>
        <OnboardingWizard />
      </div>
    </div>
  );
}
