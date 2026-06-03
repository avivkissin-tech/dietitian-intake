'use client';
import { IntakeFormData, ACTIVITY_TYPES } from '@/app/types/form';

interface Props {
  data: IntakeFormData;
  onChange: (section: keyof IntakeFormData, field: string, value: string | string[]) => void;
}

const ACTIVITY_LEVELS = [
  { value: 'יושבני', label: 'יושבני', desc: 'בעיקר ישיבה, ללא פעילות מסודרת' },
  { value: 'קל', label: 'קל', desc: '1-2 פעמים בשבוע' },
  { value: 'מתון', label: 'מתון', desc: '3-4 פעמים בשבוע' },
  { value: 'פעיל', label: 'פעיל', desc: '5+ פעמים בשבוע' },
  { value: 'פעיל מאוד', label: 'פעיל מאוד', desc: 'ספורטאי / אימונים יומיים' },
];

export default function Step4PhysicalActivity({ data, onChange }: Props) {
  const d = data.physicalActivity;
  const activityTypes = d.activityTypes || [];

  const toggleActivity = (type: string) => {
    const updated = activityTypes.includes(type)
      ? activityTypes.filter((t) => t !== type)
      : [...activityTypes, type];
    onChange('physicalActivity', 'activityTypes', updated);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <label className="block text-xs text-gray-500 tracking-wide mb-2">רמת פעילות גופנית כללית *</label>
        <div className="space-y-2">
          {ACTIVITY_LEVELS.map(({ value, label, desc }) => (
            <label key={value} className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${d.activityLevel === value ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>
              <input
                type="radio"
                name="activityLevel"
                value={value}
                checked={d.activityLevel === value}
                onChange={(e) => onChange('physicalActivity', 'activityLevel', e.target.value)}
                className=""
              />
              <div>
                <span className="text-sm font-medium">{label}</span>
                <span className="text-xs text-gray-500 mr-2">— {desc}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-500 tracking-wide mb-2">סוגי פעילות גופנית שאתה/את עושה</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {ACTIVITY_TYPES.map((type) => (
            <label key={type} className={`flex items-center gap-2 p-2 border cursor-pointer transition-colors text-sm ${activityTypes.includes(type) ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>
              <input
                type="checkbox"
                checked={activityTypes.includes(type)}
                onChange={() => toggleActivity(type)}
                className="rounded"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-500 tracking-wide mb-1.5">כמה פעמים בשבוע?</label>
          <select
            value={d.weeklyFrequency || ''}
            onChange={(e) => onChange('physicalActivity', 'weeklyFrequency', e.target.value)}
            className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
          >
            <option value="">בחר...</option>
            {['0', '1', '2', '3', '4', '5', '6', '7+'].map((n) => (
              <option key={n} value={n}>{n} פעמים</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 tracking-wide mb-1.5">משך אימון ממוצע</label>
          <select
            value={d.sessionDuration || ''}
            onChange={(e) => onChange('physicalActivity', 'sessionDuration', e.target.value)}
            className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
          >
            <option value="">בחר...</option>
            <option value="פחות מ-30 דקות">פחות מ-30 דקות</option>
            <option value="30-45 דקות">30-45 דקות</option>
            <option value="45-60 דקות">45-60 דקות</option>
            <option value="60-90 דקות">60-90 דקות</option>
            <option value="יותר מ-90 דקות">יותר מ-90 דקות</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-500 tracking-wide mb-1.5">האם יש מגבלות גופניות / פציעות?</label>
        <textarea
          value={d.activityLimitations || ''}
          onChange={(e) => onChange('physicalActivity', 'activityLimitations', e.target.value)}
          className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300 resize-none"
          rows={2}
          placeholder="כאבי גב, פציעת ברך, אסתמה..."
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 tracking-wide mb-1.5">איזה סוג פעילות תרצה לשלב בעתיד?</label>
        <textarea
          value={d.desiredActivity || ''}
          onChange={(e) => onChange('physicalActivity', 'desiredActivity', e.target.value)}
          className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300 resize-none"
          rows={2}
          placeholder="ספר/י לנו..."
        />
      </div>
    </div>
  );
}
