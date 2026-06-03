'use client';
import { IntakeFormData } from '@/app/types/form';

interface Props {
  data: IntakeFormData;
  onChange: (section: keyof IntakeFormData, field: string, value: string | string[]) => void;
}

const DIETARY_STYLES = [
  'ללא הגבלה',
  'צמחוני',
  'טבעוני',
  'כשר',
  'ללא גלוטן',
  'ללא לקטוז',
  'ים תיכוני',
  'דל פחמימות',
  'אחר',
];

const inputClass = "w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors";
const selectClass = "w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors";
const labelClass = "block text-xs text-gray-500 tracking-wide mb-1.5";
const textareaClass = "w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300 resize-none";

export default function Step5FoodPreferences({ data, onChange }: Props) {
  const d = data.foodPreferences;
  const selectedStyles = (d as unknown as { dietaryStyles?: string[] }).dietaryStyles || [];

  const toggleStyle = (style: string) => {
    const updated = selectedStyles.includes(style)
      ? selectedStyles.filter((s) => s !== style)
      : [...selectedStyles, style];
    onChange('foodPreferences', 'dietaryStyles', updated);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <label className="block text-xs text-gray-500 tracking-wide mb-2">סגנון תזונה / העדפות (ניתן לבחור יותר מאחד)</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {DIETARY_STYLES.map((style) => (
            <label key={style} className={`flex items-center gap-2 p-2 border cursor-pointer transition-colors text-sm ${selectedStyles.includes(style) ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>
              <input
                type="checkbox"
                checked={selectedStyles.includes(style)}
                onChange={() => toggleStyle(style)}
                className="rounded"
              />
              {style}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>כמה ארוחות ביום בדרך כלל?</label>
          <select
            value={d.mealsPerDay || ''}
            onChange={(e) => onChange('foodPreferences', 'mealsPerDay', e.target.value)}
            className={selectClass}
          >
            <option value="">בחר...</option>
            {['1', '2', '3', '4', '5', '6+'].map((n) => (
              <option key={n} value={n}>{n} ארוחות</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>כמה מים אתה/את שותה ביום?</label>
          <textarea
            value={d.waterIntake || ''}
            onChange={(e) => onChange('foodPreferences', 'waterIntake', e.target.value)}
            className={textareaClass}
            rows={2}
            placeholder="למשל: 8 כוסות, בקבוק וחצי של 1.5 ליטר, לא הרבה..."
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>מאכלים שאתה/את לא אוהב/ת</label>
        <textarea
          value={d.dislikedFoods || ''}
          onChange={(e) => onChange('foodPreferences', 'dislikedFoods', e.target.value)}
          className={textareaClass}
          rows={2}
          placeholder="מאכלים שאתה/את מעדיפ/ה להימנע מהם..."
        />
      </div>

      <div>
        <label className={labelClass}>מאכלים שאתה/את נמנע/ת מלאכול (מסיבות דתיות, מוסריות וכו')</label>
        <textarea
          value={d.avoidedFoods || ''}
          onChange={(e) => onChange('foodPreferences', 'avoidedFoods', e.target.value)}
          className={textareaClass}
          rows={2}
          placeholder="בשר, דגים, חזיר..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>צריכת אלכוהול</label>
          <select
            value={d.alcoholConsumption || ''}
            onChange={(e) => onChange('foodPreferences', 'alcoholConsumption', e.target.value)}
            className={selectClass}
          >
            <option value="">בחר...</option>
            <option value="לא שותה">לא שותה</option>
            <option value="לעיתים נדירות">לעיתים נדירות</option>
            <option value="סוף שבוע בלבד">סוף שבוע בלבד</option>
            <option value="כמה פעמים בשבוע">כמה פעמים בשבוע</option>
            <option value="כל יום">כל יום</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>נשנושים בין הארוחות</label>
          <select
            value={d.snackingHabits || ''}
            onChange={(e) => onChange('foodPreferences', 'snackingHabits', e.target.value)}
            className={selectClass}
          >
            <option value="">בחר...</option>
            <option value="כמעט ולא">כמעט ולא</option>
            <option value="לעיתים">לעיתים</option>
            <option value="לעיתים קרובות">לעיתים קרובות</option>
            <option value="כל הזמן">כל הזמן</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>האם אתה/את אוכל/ת מרגש? (אכילה רגשית)</label>
        <select
          value={d.emotionalEating || ''}
          onChange={(e) => onChange('foodPreferences', 'emotionalEating', e.target.value)}
          className={selectClass}
        >
          <option value="">בחר...</option>
          <option value="לא">לא</option>
          <option value="לעיתים">לעיתים</option>
          <option value="לעיתים קרובות">לעיתים קרובות</option>
          <option value="כן, זה אתגר משמעותי עבורי">כן, זה אתגר משמעותי עבורי</option>
        </select>
      </div>
    </div>
  );
}
