import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { IntakeFormData } from '@/app/types/form';

export async function POST(req: NextRequest) {
  try {
    const data: IntakeFormData = await req.json();
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
      ['שאלון קליטה — דיאטנית קלינית'],
      [`הוגש בתאריך: ${new Date().toLocaleDateString('he-IL')}`],
      [],
      ['קטגוריה', 'שדה', 'ערך'],
      ['פרטים אישיים', 'שם פרטי', p.firstName || ''],
      ['פרטים אישיים', 'שם משפחה', p.lastName || ''],
      ['פרטים אישיים', 'ת.ז.', p.idNumber || ''],
      ['פרטים אישיים', 'תאריך לידה', p.birthDate || ''],
      ['פרטים אישיים', 'טלפון', p.phone || ''],
      ['פרטים אישיים', 'אימייל', p.email || ''],
      ['פרטים אישיים', 'עיר', p.city || ''],
      ['פרטים אישיים', 'הגיע דרך', p.referralSource || ''],
      [],
      ['מטרות', 'מטרות עיקריות', (g.primaryGoals || []).join(', ')],
      ['מטרות', 'משקל נוכחי (ק"ג)', parseFloat(g.currentWeight || '') || ''],
      ['מטרות', 'משקל יעד (ק"ג)', parseFloat(g.targetWeight || '') || ''],
      ['מטרות', 'גובה (ס"מ)', parseFloat(g.height || '') || ''],
      ['מטרות', 'BMI', calcBMI()],
      [],
      ['רקע רפואי', 'מצבים רפואיים', (m.conditions || []).join(', ')],
      ['רקע רפואי', 'מצבים נוספים', m.otherConditions || ''],
      ['רקע רפואי', 'תרופות', m.medications || ''],
      ['רקע רפואי', 'אלרגיות', m.allergies || ''],
      ['רקע רפואי', 'אי-סבילות', m.foodIntolerances || ''],
      ['רקע רפואי', 'בעיות עיכול', m.digestiveIssues || ''],
      ['רקע רפואי', 'בדיקת דם', m.lastBloodTest || ''],
      ['רקע רפואי', 'הנחיות מהרופא', m.doctorGuidelines || ''],
      [],
      ['פעילות גופנית', 'רמת פעילות', pa.activityLevel || ''],
      ['פעילות גופנית', 'סוגי פעילות', (pa.activityTypes || []).join(', ')],
      ['פעילות גופנית', 'תדירות שבועית', pa.weeklyFrequency || ''],
      ['פעילות גופנית', 'משך אימון', pa.sessionDuration || ''],
      ['פעילות גופנית', 'מגבלות גופניות', pa.activityLimitations || ''],
      [],
      ['אוכל והעדפות', 'סגנון תזונה', ((fp as unknown as { dietaryStyles?: string[] }).dietaryStyles || []).join(', ')],
      ['אוכל והעדפות', 'ארוחות ביום', fp.mealsPerDay || ''],
      ['אוכל והעדפות', 'שתיית מים', fp.waterIntake || ''],
      ['אוכל והעדפות', 'מאכלים לא אהובים', fp.dislikedFoods || ''],
      ['אוכל והעדפות', 'מאכלים נמנעים', fp.avoidedFoods || ''],
      ['אוכל והעדפות', 'אלכוהול', fp.alcoholConsumption || ''],
      ['אוכל והעדפות', 'נשנושים', fp.snackingHabits || ''],
      ['אוכל והעדפות', 'אכילה רגשית', fp.emotionalEating || ''],
      [],
      ['בישול', 'תדירות בישול', co.cookingFrequency || ''],
      ['בישול', 'מיומנות בישול', co.cookingSkill || ''],
      ['בישול', 'שעה וחצי לבישול מרוכז', co.mealPrepTime || ''],
      ['בישול', 'ציוד מטבח', (co.kitchenEquipment || []).join(', ')],
      ['בישול', 'ציוד אחר', co.kitchenEquipmentOther || ''],
      ['בישול', 'אכילה בחוץ', co.eatingOut || ''],
      ['בישול', 'צהריים בעבודה', co.workLunchSituation || ''],
      [],
      ['תמיכה ביתית', 'הרכב משפחה', hs.householdMembers || ''],
      ['תמיכה ביתית', 'תמיכה משפחתית', hs.familySupport || ''],
      ['תמיכה ביתית', 'בישול למשפחה', hs.cookingForFamily || ''],
      ['תמיכה ביתית', 'צרכי משפחה', hs.familyDietaryNeeds || ''],
      ['תמיכה ביתית', 'אתגרים בבית', hs.challengesAtHome || ''],
      ['תמיכה ביתית', 'תמיכה נדרשת', hs.supportNeeded || ''],
      [],
      ['כללי', 'הערות נוספות', data.additionalNotes || ''],
      ['כללי', 'קבצים מצורפים', data.uploadedFiles.map(f => f.name).join(', ')],
    ];

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [{ wch: 18 }, { wch: 22 }, { wch: 60 }];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'שאלון קליטה');

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }) as Buffer;
    const uint8 = new Uint8Array(buffer);

    const filename = encodeURIComponent(`שאלון_${p.lastName || 'לקוח'}_${p.firstName || ''}.xlsx`);

    return new NextResponse(uint8, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename*=UTF-8''${filename}`,
      },
    });
  } catch (error) {
    console.error('Excel export error:', error);
    return NextResponse.json({ error: 'שגיאה ביצוא' }, { status: 500 });
  }
}
