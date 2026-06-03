import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as XLSX from 'xlsx';
import { IntakeFormData } from '@/app/types/form';

function buildEmailHTML(data: IntakeFormData): string {
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
    return 'לא חושב';
  };

  const row = (label: string, value: string | string[] | undefined) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return '';
    const val = Array.isArray(value) ? value.join(', ') : value;
    return `<tr><td style="padding:6px 12px;color:#6b7280;font-weight:500;width:40%">${label}</td><td style="padding:6px 12px;color:#111827">${val}</td></tr>`;
  };

  const section = (title: string, rows: string) => `
    <h2 style="color:#065f46;border-bottom:2px solid #d1fae5;padding-bottom:8px;margin-top:24px">${title}</h2>
    <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:8px">${rows}</table>`;

  return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head><meta charset="UTF-8"><style>body{font-family:Arial,sans-serif;direction:rtl;color:#111827}</style></head>
<body style="max-width:700px;margin:0 auto;padding:20px">
  <div style="background:linear-gradient(135deg,#065f46,#059669);color:white;padding:24px;border-radius:12px;text-align:center;margin-bottom:24px">
    <h1 style="margin:0;font-size:24px">שאלון קליטה — תזונאי קליני</h1>
    <p style="margin:8px 0 0;opacity:0.9">הגיש: ${p.firstName || ''} ${p.lastName || ''} | ${new Date().toLocaleDateString('he-IL')}</p>
  </div>

  <div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:8px;padding:12px;margin-bottom:16px;text-align:center">
    <strong>BMI מחושב: ${calcBMI()}</strong>
    ${g.currentWeight ? ` | משקל: ${g.currentWeight} ק"ג` : ''}
    ${g.height ? ` | גובה: ${g.height} ס"מ` : ''}
    ${g.targetWeight ? ` | יעד: ${g.targetWeight} ק"ג` : ''}
  </div>

  ${section('פרטים אישיים', [
    row('שם מלא', `${p.firstName || ''} ${p.lastName || ''}`.trim()),
    row('ת.ז.', p.idNumber),
    row('תאריך לידה', p.birthDate),
    row('טלפון', p.phone),
    row('אימייל', p.email),
    row('עיר', p.city),
    row('הגיע דרך', p.referralSource),
  ].join(''))}

  ${section('מטרות', [
    row('מטרות עיקריות', (g.primaryGoals || []).join(', ')),
  ].join(''))}

  ${section('רקע רפואי', [
    row('מצבים רפואיים', m.conditions),
    row('מצבים נוספים', m.otherConditions),
    row('תרופות', m.medications),
    row('אלרגיות', m.allergies),
    row('אי-סבילות', m.foodIntolerances),
    row('בעיות עיכול', m.digestiveIssues),
    row('בדיקת דם אחרונה', m.lastBloodTest),
    row('הנחיות מהרופא', m.doctorGuidelines),
  ].join(''))}

  ${section('פעילות גופנית', [
    row('רמת פעילות', pa.activityLevel),
    row('סוגי פעילות', pa.activityTypes),
    row('תדירות שבועית', pa.weeklyFrequency ? `${pa.weeklyFrequency} פעמים` : ''),
    row('משך אימון', pa.sessionDuration),
    row('מגבלות גופניות', pa.activityLimitations),
    row('פעילות רצויה', pa.desiredActivity),
  ].join(''))}

  ${section('אוכל והעדפות', [
    row('סגנון תזונה', (fp as unknown as { dietaryStyles?: string[] }).dietaryStyles),
    row('ארוחות ביום', fp.mealsPerDay),
    row('שתיית מים', fp.waterIntake),
    row('מאכלים לא אהובים', fp.dislikedFoods),
    row('מאכלים נמנעים', fp.avoidedFoods),
    row('אלכוהול', fp.alcoholConsumption),
    row('נשנושים', fp.snackingHabits),
    row('אכילה רגשית', fp.emotionalEating),
  ].join(''))}

  ${section('בישול והתארגנות', [
    row('תדירות בישול', co.cookingFrequency),
    row('מיומנות בישול', co.cookingSkill),
    row('שעה וחצי לבישול מרוכז', co.mealPrepTime),
    row('ציוד מטבח', co.kitchenEquipment),
    row('ציוד אחר', co.kitchenEquipmentOther),
    row('אכילה בחוץ', co.eatingOut),
    row('צהריים בעבודה', co.workLunchSituation),
  ].join(''))}

  ${section('תמיכה ביתית', [
    row('הרכב משפחה', hs.householdMembers),
    row('תמיכה משפחתית', hs.familySupport),
    row('בישול למשפחה', hs.cookingForFamily),
    row('צרכי משפחה', hs.familyDietaryNeeds),
    row('אתגרים בבית', hs.challengesAtHome),
    row('תמיכה נדרשת', hs.supportNeeded),
  ].join(''))}

  ${data.additionalNotes ? `
  <h2 style="color:#065f46;border-bottom:2px solid #d1fae5;padding-bottom:8px;margin-top:24px">הערות נוספות</h2>
  <p style="background:#f9fafb;padding:12px;border-radius:8px">${data.additionalNotes}</p>` : ''}

  ${data.uploadedFiles.length > 0 ? `
  <h2 style="color:#065f46;border-bottom:2px solid #d1fae5;padding-bottom:8px;margin-top:24px">קבצים מצורפים</h2>
  <ul>${data.uploadedFiles.map(f => `<li>${f.name} (${(f.size / 1024).toFixed(0)} KB)</li>`).join('')}</ul>` : ''}

  <div style="margin-top:32px;padding:16px;background:#f0fdf4;border-radius:8px;font-size:12px;color:#6b7280;text-align:center">
    נשלח אוטומטית ממערכת שאלון הקליטה | ${new Date().toLocaleString('he-IL')}
  </div>
</body>
</html>`;
}

function buildExcelBuffer(data: IntakeFormData): Buffer {
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
    if (w && h) return parseFloat((w / (h * h)).toFixed(1));
    return '';
  };

  const rows: (string | number)[][] = [
    ['קטגוריה', 'שדה', 'ערך'],
    ['פרטים אישיים', 'שם פרטי', p.firstName || ''],
    ['פרטים אישיים', 'שם משפחה', p.lastName || ''],
    ['פרטים אישיים', 'ת.ז.', p.idNumber || ''],
    ['פרטים אישיים', 'תאריך לידה', p.birthDate || ''],
    ['פרטים אישיים', 'טלפון', p.phone || ''],
    ['פרטים אישיים', 'אימייל', p.email || ''],
    ['פרטים אישיים', 'עיר', p.city || ''],
    ['פרטים אישיים', 'הגיע דרך', p.referralSource || ''],
    ['מטרות', 'מטרות עיקריות', (g.primaryGoals || []).join(', ')],
    ['מטרות', 'משקל נוכחי (ק"ג)', parseFloat(g.currentWeight || '') || ''],
    ['מטרות', 'משקל יעד (ק"ג)', parseFloat(g.targetWeight || '') || ''],
    ['מטרות', 'גובה (ס"מ)', parseFloat(g.height || '') || ''],
    ['מטרות', 'BMI', calcBMI()],
    ['רקע רפואי', 'מצבים רפואיים', (m.conditions || []).join(', ')],
    ['רקע רפואי', 'מצבים נוספים', m.otherConditions || ''],
    ['רקע רפואי', 'תרופות', m.medications || ''],
    ['רקע רפואי', 'אלרגיות', m.allergies || ''],
    ['רקע רפואי', 'אי-סבילות', m.foodIntolerances || ''],
    ['רקע רפואי', 'בעיות עיכול', m.digestiveIssues || ''],
    ['רקע רפואי', 'בדיקת דם', m.lastBloodTest || ''],
    ['רקע רפואי', 'הנחיות מהרופא', m.doctorGuidelines || ''],
    ['פעילות גופנית', 'רמת פעילות', pa.activityLevel || ''],
    ['פעילות גופנית', 'סוגי פעילות', (pa.activityTypes || []).join(', ')],
    ['פעילות גופנית', 'תדירות שבועית', pa.weeklyFrequency || ''],
    ['פעילות גופנית', 'משך אימון', pa.sessionDuration || ''],
    ['פעילות גופנית', 'מגבלות גופניות', pa.activityLimitations || ''],
    ['אוכל והעדפות', 'סגנון תזונה', ((fp as unknown as { dietaryStyles?: string[] }).dietaryStyles || []).join(', ')],
    ['אוכל והעדפות', 'ארוחות ביום', fp.mealsPerDay || ''],
    ['אוכל והעדפות', 'שתיית מים', fp.waterIntake || ''],
    ['אוכל והעדפות', 'מאכלים לא אהובים', fp.dislikedFoods || ''],
    ['אוכל והעדפות', 'מאכלים נמנעים', fp.avoidedFoods || ''],
    ['אוכל והעדפות', 'אלכוהול', fp.alcoholConsumption || ''],
    ['אוכל והעדפות', 'נשנושים', fp.snackingHabits || ''],
    ['אוכל והעדפות', 'אכילה רגשית', fp.emotionalEating || ''],
    ['בישול', 'תדירות בישול', co.cookingFrequency || ''],
    ['בישול', 'מיומנות בישול', co.cookingSkill || ''],
    ['בישול', 'שעה וחצי לבישול מרוכז', co.mealPrepTime || ''],
    ['בישול', 'ציוד מטבח', (co.kitchenEquipment || []).join(', ')],
    ['בישול', 'ציוד אחר', co.kitchenEquipmentOther || ''],
    ['בישול', 'אכילה בחוץ', co.eatingOut || ''],
    ['בישול', 'צהריים בעבודה', co.workLunchSituation || ''],
    ['תמיכה ביתית', 'הרכב משפחה', hs.householdMembers || ''],
    ['תמיכה ביתית', 'תמיכה משפחתית', hs.familySupport || ''],
    ['תמיכה ביתית', 'בישול למשפחה', hs.cookingForFamily || ''],
    ['תמיכה ביתית', 'צרכי משפחה', hs.familyDietaryNeeds || ''],
    ['תמיכה ביתית', 'אתגרים בבית', hs.challengesAtHome || ''],
    ['תמיכה ביתית', 'תמיכה נדרשת', hs.supportNeeded || ''],
    ['כללי', 'הערות נוספות', data.additionalNotes || ''],
    ['כללי', 'קבצים מצורפים', data.uploadedFiles.map(f => f.name).join(', ')],
    ['כללי', 'תאריך הגשה', new Date().toLocaleString('he-IL')],
  ];

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{ wch: 18 }, { wch: 22 }, { wch: 55 }];

  // Style header row
  ws['A1'] = { v: 'קטגוריה', t: 's' };
  ws['B1'] = { v: 'שדה', t: 's' };
  ws['C1'] = { v: 'ערך', t: 's' };

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'שאלון קליטה');

  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }) as Buffer;
}

export async function POST(req: NextRequest) {
  try {
    const data: IntakeFormData = await req.json();

    const excelBuffer = buildExcelBuffer(data);

    // Prepare attachments
    const attachments: { filename: string; content: string }[] = [
      {
        filename: `שאלון_${data.personalDetails.lastName || 'לקוח'}_${data.personalDetails.firstName || ''}.xlsx`,
        content: Buffer.from(excelBuffer).toString('base64'),
      },
    ];

    // Attach uploaded files
    for (const file of data.uploadedFiles) {
      if (file.dataUrl) {
        const base64Data = file.dataUrl.split(',')[1];
        if (base64Data) {
          attachments.push({ filename: file.name, content: base64Data });
        }
      }
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'שאלון קליטה <onboarding@resend.dev>',
      to: process.env.DIETITIAN_EMAIL!,
      subject: `שאלון קליטה חדש — ${data.personalDetails.firstName || ''} ${data.personalDetails.lastName || ''}`,
      html: buildEmailHTML(data),
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json({ success: false, error: 'שגיאה בשליחה' }, { status: 500 });
  }
}
