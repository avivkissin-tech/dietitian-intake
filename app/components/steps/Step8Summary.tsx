'use client';
import { IntakeFormData } from '@/app/types/form';

interface Props {
  data: IntakeFormData;
  onChange: (section: keyof IntakeFormData, field: string, value: string | boolean) => void;
}

function SummarySection({ title, items }: { title: string; items: [string, string][] }) {
  const validItems = items.filter(([, v]) => v && v !== '' && v !== '[]');
  if (validItems.length === 0) return null;
  return (
    <div className="mb-4">
      <h3 className="font-semibold text-emerald-700 mb-2 text-sm">{title}</h3>
      <div className="bg-gray-50 rounded-lg p-3 space-y-1">
        {validItems.map(([label, value]) => (
          <div key={label} className="flex gap-2 text-sm">
            <span className="text-gray-500 min-w-fit">{label}:</span>
            <span className="text-gray-800">{Array.isArray(value) ? (value as string[]).join(', ') : value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Step8Summary({ data, onChange }: Props) {
  const p = data.personalDetails;
  const g = data.goals;
  const m = data.medicalBackground;
  const pa = data.physicalActivity;
  const fp = data.foodPreferences;
  const co = data.cookingOrganization;
  const hs = data.homeSupport;

  const calcBMI = () => {
    const w = parseFloat(g.currentWeight || '');
    const h = parseFloat(g.height || '') / 100;
    if (w && h) return (w / (h * h)).toFixed(1);
    return null;
  };
  const bmi = calcBMI();

  return (
    <div className="space-y-4" dir="rtl">
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4">
        <h2 className="text-lg font-bold text-emerald-800 mb-1">
          {p.firstName && p.lastName ? `סיכום שאלון — ${p.firstName} ${p.lastName}` : 'סיכום שאלון'}
        </h2>
        {bmi && (
          <p className="text-sm text-emerald-700">BMI מחושב: <strong>{bmi}</strong></p>
        )}
      </div>

      <SummarySection title="פרטים אישיים" items={[
        ['שם', `${p.firstName || ''} ${p.lastName || ''}`.trim()],
        ['טלפון', p.phone || ''],
        ['אימייל', p.email || ''],
        ['עיר', p.city || ''],
        ['הגיע דרך', p.referralSource || ''],
      ]} />

      <SummarySection title="מטרות" items={[
        ['מטרות עיקריות', (g.primaryGoals || []).join(', ')],
        ['משקל נוכחי', g.currentWeight ? `${g.currentWeight} ק"ג` : ''],
        ['משקל יעד', g.targetWeight ? `${g.targetWeight} ק"ג` : ''],
        ['גובה', g.height ? `${g.height} ס"מ` : ''],
      ]} />

      <SummarySection title="רקע רפואי" items={[
        ['מצבים רפואיים', (m.conditions || []).join(', ')],
        ['תרופות', m.medications || ''],
        ['אלרגיות', m.allergies || ''],
        ['אי-סבילות', m.foodIntolerances || ''],
        ['הנחיות מהרופא', m.doctorGuidelines || ''],
      ]} />

      <SummarySection title="פעילות גופנית" items={[
        ['רמת פעילות', pa.activityLevel || ''],
        ['סוגי פעילות', (pa.activityTypes || []).join(', ')],
        ['תדירות', pa.weeklyFrequency ? `${pa.weeklyFrequency} פעמים/שבוע` : ''],
      ]} />

      <SummarySection title="אוכל והעדפות" items={[
        ['סגנון תזונה', fp.dietaryStyle || ''],
        ['ארוחות ביום', fp.mealsPerDay || ''],
        ['שתיית מים', fp.waterIntake || ''],
        ['אלכוהול', fp.alcoholConsumption || ''],
      ]} />

      <SummarySection title="בישול והתארגנות" items={[
        ['תדירות בישול', co.cookingFrequency || ''],
        ['מיומנות בישול', co.cookingSkill || ''],
        ['זמן להכנה', co.mealPrepTime || ''],
        ['אכילה בחוץ', co.eatingOut || ''],
      ]} />

      <SummarySection title="תמיכה ביתית" items={[
        ['הרכב משפחה', hs.householdMembers || ''],
        ['תמיכה משפחתית', hs.familySupport || ''],
      ]} />

      {data.uploadedFiles.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-emerald-700 mb-2 text-sm">קבצים מצורפים ({data.uploadedFiles.length})</h3>
          <div className="bg-gray-50 rounded-lg p-3 space-y-1">
            {data.uploadedFiles.map((f, i) => (
              <div key={i} className="text-sm text-gray-700">📎 {f.name}</div>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-xs text-gray-500 tracking-wide mb-1.5">הערות נוספות</label>
        <textarea
          value={data.additionalNotes}
          onChange={(e) => onChange('additionalNotes' as keyof IntakeFormData, '', e.target.value)}
          className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300 resize-none"
          rows={3}
          placeholder="כל דבר נוסף שחשוב לך לשתף..."
        />
      </div>

      <div>
        <label className={`flex items-start gap-3 p-4 border-2 cursor-pointer transition-colors ${data.consentGiven ? 'border-gray-900 bg-gray-50' : 'border-gray-300'}`}>
          <input
            type="checkbox"
            checked={data.consentGiven}
            onChange={(e) => onChange('consentGiven' as keyof IntakeFormData, '', e.target.checked as unknown as string)}
            className="mt-0.5 rounded"
          />
          <span className="text-sm text-gray-700">
            אני מאשר/ת שהמידע שמסרתי נכון ומלא. אני מסכים/ה לשימוש בפרטים אלו לצורך קביעת תוכנית תזונה אישית. המידע יישמר בסודיות מלאה ולא יועבר לגורמים שלישיים.
          </span>
        </label>
      </div>
    </div>
  );
}
