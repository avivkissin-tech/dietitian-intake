'use client';
import { IntakeFormData } from '@/app/types/form';

interface Props {
  data: IntakeFormData;
  onChange: (section: keyof IntakeFormData, field: string, value: string) => void;
}

const inputClass = "w-full border border-gray-200 bg-white px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300";
const labelClass = "block text-xs text-gray-500 tracking-wide mb-1.5";

export default function Step1PersonalDetails({ data, onChange }: Props) {
  const d = data.personalDetails;

  return (
    <div className="space-y-5" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>שם פרטי</label>
          <input
            type="text"
            value={d.firstName || ''}
            onChange={(e) => onChange('personalDetails', 'firstName', e.target.value)}
            className={inputClass}
            placeholder="שם פרטי"
          />
        </div>
        <div>
          <label className={labelClass}>שם משפחה</label>
          <input
            type="text"
            value={d.lastName || ''}
            onChange={(e) => onChange('personalDetails', 'lastName', e.target.value)}
            className={inputClass}
            placeholder="שם משפחה"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>תאריך לידה</label>
        <input
          type="date"
          value={d.birthDate || ''}
          onChange={(e) => onChange('personalDetails', 'birthDate', e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>טלפון</label>
          <input
            type="tel"
            value={d.phone || ''}
            onChange={(e) => onChange('personalDetails', 'phone', e.target.value)}
            className={inputClass}
            placeholder="050-0000000"
          />
        </div>
        <div>
          <label className={labelClass}>אימייל</label>
          <input
            type="email"
            value={d.email || ''}
            onChange={(e) => onChange('personalDetails', 'email', e.target.value)}
            className={inputClass}
            placeholder="example@email.com"
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>עיר מגורים</label>
        <input
          type="text"
          value={d.city || ''}
          onChange={(e) => onChange('personalDetails', 'city', e.target.value)}
          className={inputClass}
          placeholder="עיר מגורים"
        />
      </div>
    </div>
  );
}
