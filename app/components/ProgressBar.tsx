'use client';

interface Props {
  currentStep: number;
  totalSteps: number;
  steps: { title: string; icon: string }[];
}

export default function ProgressBar({ currentStep, totalSteps, steps }: Props) {
  const progress = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-gray-400 tracking-widest">
          {currentStep + 1} / {totalSteps}
        </span>
        <span className="text-xs text-gray-400 tracking-wide">
          {steps[currentStep]?.title}
        </span>
      </div>
      <div className="w-full bg-gray-100 h-px">
        <div
          className="bg-gray-900 h-px transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
