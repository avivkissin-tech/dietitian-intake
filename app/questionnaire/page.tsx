import IntakeWizard from '../components/IntakeWizard';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f7f4]" dir="rtl">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-px h-12 bg-emerald-700 mx-auto mb-6" />
          <h1 className="text-3xl font-light tracking-widest text-gray-900 uppercase mb-3">
            שאלון קליטה
          </h1>
          <p className="text-gray-400 text-sm tracking-wide">
            אנא מלא/י את הפרטים הבאים לפני הפגישה הראשונה
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-none shadow-sm p-8 md:p-12 border border-gray-200">
          <IntakeWizard />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-300 mt-8 tracking-wide">
          המידע נשמר בסודיות מלאה ומשמש לצורך בניית תוכנית תזונה אישית בלבד
        </p>
      </div>
    </main>
  );
}
