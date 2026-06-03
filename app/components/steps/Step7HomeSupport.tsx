'use client';
import { IntakeFormData } from '@/app/types/form';

interface Props {
  data: IntakeFormData;
  onChange: (section: keyof IntakeFormData, field: string, value: string) => void;
}

export default function Step7HomeSupport({ data, onChange }: Props) {
  const d = data.homeSupport;

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <label className="block text-xs text-gray-500 tracking-wide mb-1.5">מי גר איתך בבית?</label>
        <select
          value={d.householdMembers || ''}
          onChange={(e) => onChange('homeSupport', 'householdMembers', e.target.value)}
          className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
        >
          <option value="">בחר...</option>
          <option value="גר לבד">גר לבד</option>
          <option value="עם בן/בת זוג">עם בן/בת זוג</option>
          <option value="עם ילדים">עם ילדים</option>
          <option value="עם בן/בת זוג וילדים">עם בן/בת זוג וילדים</option>
          <option value="עם הורים">עם הורים</option>
          <option value="שותפים">שותפים</option>
          <option value="אחר">אחר</option>
        </select>
      </div>

      <div>
        <label className="block text-xs text-gray-500 tracking-wide mb-2">האם בני הבית תומכים בתהליך שלך?</label>
        <div className="space-y-2">
          {[
            { value: 'תמיכה מלאה', desc: 'כולם מעודדים ותומכים' },
            { value: 'תמיכה חלקית', desc: 'חלקם תומכים' },
            { value: 'אדישות', desc: 'לא מתנגדים אבל לא מסייעים' },
            { value: 'קושי', desc: 'יש קצת התנגדות / אי הבנה' },
          ].map(({ value, desc }) => (
            <label key={value} className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${d.familySupport === value ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>
              <input
                type="radio"
                name="familySupport"
                value={value}
                checked={d.familySupport === value}
                onChange={(e) => onChange('homeSupport', 'familySupport', e.target.value)}
                className=""
              />
              <div>
                <span className="text-sm font-medium">{value}</span>
                <span className="text-xs text-gray-500 mr-2">— {desc}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-500 tracking-wide mb-1.5">האם אתה/את מבשל/ת גם לבני הבית?</label>
        <div className="flex flex-wrap gap-3">
          {['כן, תמיד', 'לרוב', 'לפעמים', 'לא'].map((opt) => (
            <label key={opt} className={`flex items-center gap-2 px-4 py-2 border cursor-pointer transition-colors text-sm ${d.cookingForFamily === opt ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>
              <input
                type="radio"
                name="cookingForFamily"
                value={opt}
                checked={d.cookingForFamily === opt}
                onChange={(e) => onChange('homeSupport', 'cookingForFamily', e.target.value)}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-500 tracking-wide mb-1.5">האם לבני הבית יש צרכים תזונתיים מיוחדים?</label>
        <textarea
          value={d.familyDietaryNeeds || ''}
          onChange={(e) => onChange('homeSupport', 'familyDietaryNeeds', e.target.value)}
          className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300 resize-none"
          rows={2}
          placeholder="ילד עם אלרגיה, בן זוג שמעדיף בשר..."
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 tracking-wide mb-1.5">מה האתגרים העיקריים שלך בבית?</label>
        <textarea
          value={d.challengesAtHome || ''}
          onChange={(e) => onChange('homeSupport', 'challengesAtHome', e.target.value)}
          className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300 resize-none"
          rows={3}
          placeholder="חטיפים בבית, ילדים שרוצים אוכל לא בריא, לחץ ממשפחה..."
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 tracking-wide mb-1.5">במה תרצה שנעזור לך יותר?</label>
        <textarea
          value={d.supportNeeded || ''}
          onChange={(e) => onChange('homeSupport', 'supportNeeded', e.target.value)}
          className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300 resize-none"
          rows={3}
          placeholder="תמיכה רגשית, מתכונים משפחתיים, הדרכה לבני הבית..."
        />
      </div>
    </div>
  );
}
