'use client';
import { IntakeFormData } from '@/app/types/form';

interface Props {
  data: IntakeFormData;
  onChange: (section: keyof IntakeFormData, field: string, value: string | string[]) => void;
}

const PRIMARY_GOALS = [
  'ירידה במשקל',
  'עלייה במשקל / בניית מסת שריר',
  'שמירה על משקל',
  'שיפור בריאות כללית',
  'ניהול מצב רפואי (סוכרת, כולסטרול וכו\')',
  'שיפור ביצועים ספורטיביים',
  'שיפור אנרגיה ותחושת בריאות',
  'אכילה בריאה יותר לכל המשפחה',
];

export default function Step2Goals({ data, onChange }: Props) {
  const d = data.goals;
  const selectedGoals = d.primaryGoals || [];

  const toggleGoal = (goal: string) => {
    const updated = selectedGoals.includes(goal)
      ? selectedGoals.filter((g) => g !== goal)
      : [...selectedGoals, goal];
    onChange('goals', 'primaryGoals', updated);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <label className="block text-xs text-gray-500 tracking-wide mb-2">מה המטרה העיקרית שלך? * (ניתן לבחור יותר מאחת)</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {PRIMARY_GOALS.map((goal) => (
            <label key={goal} className={`flex items-center gap-2 p-3 border cursor-pointer transition-colors ${selectedGoals.includes(goal) ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>
              <input
                type="checkbox"
                checked={selectedGoals.includes(goal)}
                onChange={() => toggleGoal(goal)}
                className="rounded"
              />
              <span className="text-sm">{goal}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-gray-500 tracking-wide mb-1.5">משקל נוכחי (ק"ג)</label>
          <input
            type="number"
            value={d.currentWeight || ''}
            onChange={(e) => onChange('goals', 'currentWeight', e.target.value)}
            className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300"
            placeholder="70"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 tracking-wide mb-1.5">משקל יעד (ק"ג)</label>
          <input
            type="number"
            value={d.targetWeight || ''}
            onChange={(e) => onChange('goals', 'targetWeight', e.target.value)}
            className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300"
            placeholder="65"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 tracking-wide mb-1.5">גובה (ס"מ)</label>
          <input
            type="number"
            value={d.height || ''}
            onChange={(e) => onChange('goals', 'height', e.target.value)}
            className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300"
            placeholder="170"
          />
        </div>
      </div>
    </div>
  );
}
