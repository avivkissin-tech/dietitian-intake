'use client';
import { IntakeFormData, KITCHEN_EQUIPMENT } from '@/app/types/form';

interface Props {
  data: IntakeFormData;
  onChange: (section: keyof IntakeFormData, field: string, value: string | string[]) => void;
}

const selectClass = "w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors";
const labelClass = "block text-xs text-gray-500 tracking-wide mb-1.5";
const textareaClass = "w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300 resize-none";

export default function Step6CookingOrganization({ data, onChange }: Props) {
  const d = data.cookingOrganization;
  const equipment = d.kitchenEquipment || [];
  const hasOther = equipment.includes('אחר');

  const toggleEquipment = (item: string) => {
    const updated = equipment.includes(item)
      ? equipment.filter((e) => e !== item)
      : [...equipment, item];
    onChange('cookingOrganization', 'kitchenEquipment', updated);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>כמה פעמים בשבוע אתה/את מבשל/ת?</label>
          <select
            value={d.cookingFrequency || ''}
            onChange={(e) => onChange('cookingOrganization', 'cookingFrequency', e.target.value)}
            className={selectClass}
          >
            <option value="">בחר...</option>
            <option value="כמעט ולא">כמעט ולא</option>
            <option value="1-2 פעמים">1-2 פעמים</option>
            <option value="3-4 פעמים">3-4 פעמים</option>
            <option value="5-6 פעמים">5-6 פעמים</option>
            <option value="כל יום">כל יום</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>רמת מיומנות בבישול</label>
          <select
            value={d.cookingSkill || ''}
            onChange={(e) => onChange('cookingOrganization', 'cookingSkill', e.target.value)}
            className={selectClass}
          >
            <option value="">בחר...</option>
            <option value="מתחיל">מתחיל — בסיסי מאוד</option>
            <option value="בינוני">בינוני — מתכונים פשוטים</option>
            <option value="טוב">טוב — מתכונים מגוונים</option>
            <option value="מצוין">מצוין — בישול מתקדם</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>האם יש לך שעה וחצי פנויה לבשל פעם אחת בשבוע (בישול מרוכז)?</label>
        <div className="space-y-2">
          {[
            { value: 'כן, בקלות', desc: 'יש לי זמן פנוי לבישול מרוכז' },
            { value: 'כן, אבל צריך לתכנן', desc: 'אפשרי אם נקבע מראש' },
            { value: 'בקושי', desc: 'לוח הזמנים שלי עמוס' },
            { value: 'לא', desc: 'אין לי זמן לבישול ארוך' },
          ].map(({ value, desc }) => (
            <label key={value} className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${d.mealPrepTime === value ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>
              <input
                type="radio"
                name="mealPrepTime"
                value={value}
                checked={d.mealPrepTime === value}
                onChange={(e) => onChange('cookingOrganization', 'mealPrepTime', e.target.value)}
              />
              <div>
                <span className="text-sm font-medium text-gray-900">{value}</span>
                <span className="text-xs text-gray-400 mr-2">— {desc}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-500 tracking-wide mb-2">ציוד מטבח זמין</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {KITCHEN_EQUIPMENT.map((item) => (
            <label key={item} className={`flex items-center gap-2 p-2 border cursor-pointer transition-colors text-sm ${equipment.includes(item) ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>
              <input
                type="checkbox"
                checked={equipment.includes(item)}
                onChange={() => toggleEquipment(item)}
                className="rounded"
              />
              {item}
            </label>
          ))}
          <label className={`flex items-center gap-2 p-2 border cursor-pointer transition-colors text-sm ${hasOther ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>
            <input
              type="checkbox"
              checked={hasOther}
              onChange={() => toggleEquipment('אחר')}
              className="rounded"
            />
            אחר
          </label>
        </div>
        {hasOther && (
          <textarea
            value={d.kitchenEquipmentOther || ''}
            onChange={(e) => onChange('cookingOrganization', 'kitchenEquipmentOther', e.target.value)}
            className={`mt-2 ${textareaClass}`}
            rows={2}
            placeholder="פרט/י..."
          />
        )}
      </div>

      <div>
        <label className={labelClass}>כמה פעמים בשבוע אוכלים בחוץ?</label>
        <select
          value={d.eatingOut || ''}
          onChange={(e) => onChange('cookingOrganization', 'eatingOut', e.target.value)}
          className={selectClass}
        >
          <option value="">בחר...</option>
          <option value="כמעט ולא">כמעט ולא</option>
          <option value="פעם בשבוע">פעם בשבוע</option>
          <option value="2-3 פעמים">2-3 פעמים</option>
          <option value="4-5 פעמים">4-5 פעמים</option>
          <option value="כמעט כל יום">כמעט כל יום</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>ארוחת צהריים בעבודה — כיצד?</label>
        <select
          value={d.workLunchSituation || ''}
          onChange={(e) => onChange('cookingOrganization', 'workLunchSituation', e.target.value)}
          className={selectClass}
        >
          <option value="">בחר...</option>
          <option value="מביא מהבית">מביא מהבית</option>
          <option value="קונה בעבודה / מסעדה">קונה בעבודה / מסעדה</option>
          <option value="אוכל בבית">אוכל בבית (עובד מהבית)</option>
          <option value="משתנה">משתנה</option>
          <option value="לא אוכל ארוחת צהריים">לא אוכל ארוחת צהריים</option>
        </select>
      </div>
    </div>
  );
}
