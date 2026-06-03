'use client';
import { useState } from 'react';
import { IntakeFormData } from '@/app/types/form';
import ProgressBar from './ProgressBar';
import Step1PersonalDetails from './steps/Step1PersonalDetails';
import Step2Goals from './steps/Step2Goals';
import Step3MedicalBackground from './steps/Step3MedicalBackground';
import Step4PhysicalActivity from './steps/Step4PhysicalActivity';
import Step5FoodPreferences from './steps/Step5FoodPreferences';
import Step6CookingOrganization from './steps/Step6CookingOrganization';
import Step7HomeSupport from './steps/Step7HomeSupport';
import Step8Summary from './steps/Step8Summary';
import FileUpload from './FileUpload';
import { UploadedFile } from '@/app/types/form';

const STEPS = [
  { title: 'פרטים אישיים', icon: '01' },
  { title: 'מטרות', icon: '02' },
  { title: 'רקע רפואי', icon: '03' },
  { title: 'פעילות גופנית', icon: '04' },
  { title: 'אוכל והעדפות', icon: '05' },
  { title: 'בישול', icon: '06' },
  { title: 'תמיכה ביתית', icon: '07' },
  { title: 'סיכום', icon: '08' },
];

const INITIAL_DATA: IntakeFormData = {
  personalDetails: {},
  goals: {},
  medicalBackground: {},
  physicalActivity: {},
  foodPreferences: {},
  cookingOrganization: {},
  homeSupport: {},
  uploadedFiles: [],
  additionalNotes: '',
  consentGiven: false,
};

export default function IntakeWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<IntakeFormData>(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (section: keyof IntakeFormData, field: string, value: string | string[] | boolean) => {
    if (section === 'additionalNotes') {
      setData((prev) => ({ ...prev, additionalNotes: value as string }));
    } else if (section === 'consentGiven') {
      setData((prev) => ({ ...prev, consentGiven: value as boolean }));
    } else {
      setData((prev) => ({
        ...prev,
        [section]: { ...(prev[section] as object), [field]: value },
      }));
    }
  };

  const handleFilesChange = (files: UploadedFile[]) => {
    setData((prev) => ({ ...prev, uploadedFiles: files }));
  };

  const handleSubmit = async () => {
    if (!data.consentGiven) {
      alert('יש לאשר את תנאי השימוש לפני שליחה');
      return;
    }
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setSubmitError('שגיאה בשליחה. אנא נסה שנית.');
      }
    } catch {
      setSubmitError('שגיאה בחיבור לשרת. אנא נסה שנית.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-16" dir="rtl">
        <div className="w-px h-12 bg-emerald-700 mx-auto mb-8" />
        <h2 className="text-2xl font-light tracking-widest text-gray-900 mb-3">השאלון נשלח בהצלחה</h2>
        <p className="text-gray-400 text-sm">
          {data.personalDetails.firstName ? `תודה, ${data.personalDetails.firstName}.` : 'תודה.'}{' '}
          אביב יחזור אליך בקרוב.
        </p>
      </div>
    );
  }

  const isLastStep = step === STEPS.length - 1;
  const isFileStep = step === 6; // after home support, show file upload before summary

  return (
    <div dir="rtl">
      <ProgressBar currentStep={step} totalSteps={STEPS.length} steps={STEPS} />

      <div className="min-h-[400px]">
        <div className="mb-8">
          <span className="text-xs text-gray-400 tracking-widest">{STEPS[step].icon}</span>
          <h2 className="text-xl font-light tracking-wide text-gray-900 mt-1">{STEPS[step].title}</h2>
          <div className="w-8 h-px bg-emerald-700 mt-3" />
        </div>

        {step === 0 && <Step1PersonalDetails data={data} onChange={handleChange} />}
        {step === 1 && <Step2Goals data={data} onChange={handleChange} />}
        {step === 2 && <Step3MedicalBackground data={data} onChange={handleChange} />}
        {step === 3 && <Step4PhysicalActivity data={data} onChange={handleChange} />}
        {step === 4 && <Step5FoodPreferences data={data} onChange={handleChange} />}
        {step === 5 && <Step6CookingOrganization data={data} onChange={handleChange} />}
        {step === 6 && (
          <div className="space-y-8">
            <Step7HomeSupport data={data} onChange={handleChange} />
            <div>
              <h3 className="text-base font-light tracking-wide text-gray-900 mb-4 border-t border-gray-100 pt-8">
                העלאת מסמכים
                <span className="text-xs text-gray-400 mr-2">(בדיקות דם, מסמכים רפואיים)</span>
              </h3>
              <FileUpload files={data.uploadedFiles} onFilesChange={handleFilesChange} />
            </div>
          </div>
        )}
        {step === 7 && <Step8Summary data={data} onChange={handleChange} />}
      </div>

      {submitError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {submitError}
        </div>
      )}

      <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
        <button
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="text-sm text-gray-400 tracking-wide hover:text-gray-700 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
הקודם →
        </button>

        <div className="flex gap-4">
          {isLastStep ? (
            <button
              onClick={handleSubmit}
              disabled={submitting || !data.consentGiven}
              className="px-8 py-2.5 bg-gray-900 text-white text-sm tracking-widest hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? 'שולח...' : 'שליחה'}
            </button>
          ) : (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="px-8 py-2.5 bg-gray-900 text-white text-sm tracking-widest hover:bg-gray-700 transition-colors"
            >
              המשך
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
