'use client';
import { IntakeFormData, MEDICAL_CONDITIONS } from '@/app/types/form';

interface Props {
  data: IntakeFormData;
  onChange: (section: keyof IntakeFormData, field: string, value: string | string[]) => void;
}

export default function Step3MedicalBackground({ data, onChange }: Props) {
  const d = data.medicalBackground;
  const conditions = d.conditions || [];

  const toggleCondition = (condition: string) => {
    const updated = conditions.includes(condition)
      ? conditions.filter((c) => c !== condition)
      : [...conditions, condition];
    onChange('medicalBackground', 'conditions', updated);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <label className="block text-xs text-gray-500 tracking-wide mb-2">מצבים רפואיים קיימים (סמן/י את כל הרלוונטיים)</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {MEDICAL_CONDITIONS.map((condition) => (
            <label key={condition} className={`flex items-center gap-2 p-3 border cursor-pointer transition-colors ${conditions.includes(condition) ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>
              <input
                type="checkbox"
                checked={conditions.includes(condition)}
                onChange={() => toggleCondition(condition)}
                className="rounded"
              />
              <span className="text-sm">{condition}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-500 tracking-wide mb-1.5">מצבים רפואיים נוספים שלא מופיעים ברשימה</label>
        <input
          type="text"
          value={d.otherConditions || ''}
          onChange={(e) => onChange('medicalBackground', 'otherConditions', e.target.value)}
          className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300"
          placeholder="פרט/י..."
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 tracking-wide mb-1.5">תרופות שאתה/את נוטל/ת כרגע</label>
        <textarea
          value={d.medications || ''}
          onChange={(e) => onChange('medicalBackground', 'medications', e.target.value)}
          className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300 resize-none"
          rows={3}
          placeholder="שם התרופה, מינון, תדירות..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-500 tracking-wide mb-1.5">אלרגיות למזון</label>
          <textarea
            value={d.allergies || ''}
            onChange={(e) => onChange('medicalBackground', 'allergies', e.target.value)}
            className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300 resize-none"
            rows={2}
            placeholder="למשל: בוטנים, חלב..."
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 tracking-wide mb-1.5">אי-סבילות למזון</label>
          <textarea
            value={d.foodIntolerances || ''}
            onChange={(e) => onChange('medicalBackground', 'foodIntolerances', e.target.value)}
            className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300 resize-none"
            rows={2}
            placeholder="למשל: לקטוז, גלוטן..."
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-500 tracking-wide mb-1.5">בעיות עיכול</label>
        <textarea
          value={d.digestiveIssues || ''}
          onChange={(e) => onChange('medicalBackground', 'digestiveIssues', e.target.value)}
          className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300 resize-none"
          rows={2}
          placeholder="נפיחות, עצירות, שלשולים, רפלוקס..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-500 tracking-wide mb-1.5">מתי בוצעה בדיקת דם אחרונה?</label>
          <input
            type="date"
            value={d.lastBloodTest || ''}
            onChange={(e) => onChange('medicalBackground', 'lastBloodTest', e.target.value)}
            className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 tracking-wide mb-1.5">האם יש הנחיות מהרופא בנוגע לדיאטה?</label>
          <textarea
            value={d.doctorGuidelines || ''}
            onChange={(e) => onChange('medicalBackground', 'doctorGuidelines', e.target.value)}
            className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300 resize-none"
            rows={2}
            placeholder="למשל: להימנע מחלב, דיאטה דלת במלח..."
          />
        </div>
      </div>
    </div>
  );
}
