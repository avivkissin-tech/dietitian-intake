export interface PersonalDetails {
  firstName: string;
  lastName: string;
  idNumber: string;
  birthDate: string;
  phone: string;
  email: string;
  city: string;
  referralSource: string;
}

export interface Goals {
  primaryGoals: string[];
  targetWeight: string;
  currentWeight: string;
  height: string;
}

export interface MedicalBackground {
  conditions: string[];
  otherConditions: string;
  medications: string;
  allergies: string;
  foodIntolerances: string;
  digestiveIssues: string;
  lastBloodTest: string;
  bloodTestResults: string;
  doctorGuidelines: string;
}

export interface PhysicalActivity {
  activityLevel: string;
  activityTypes: string[];
  weeklyFrequency: string;
  sessionDuration: string;
  activityLimitations: string;
  desiredActivity: string;
}

export interface FoodPreferences {
  eatingPattern: string;
  mealsPerDay: string;
  waterIntake: string;
  likedFoods: string;
  dislikedFoods: string;
  avoidedFoods: string;
  dietaryStyle: string;
  alcoholConsumption: string;
  snackingHabits: string;
  emotionalEating: string;
}

export interface CookingOrganization {
  cookingFrequency: string;
  cookingSkill: string;
  mealPrepTime: string;
  kitchenEquipment: string[];
  kitchenEquipmentOther: string;
  eatingOut: string;
  workLunchSituation: string;
}

export interface HomeSupport {
  householdMembers: string;
  familySupport: string;
  cookingForFamily: string;
  familyDietaryNeeds: string;
  challengesAtHome: string;
  supportNeeded: string;
}

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  dataUrl?: string;
}

export interface IntakeFormData {
  personalDetails: Partial<PersonalDetails>;
  goals: Partial<Goals>;
  medicalBackground: Partial<MedicalBackground>;
  physicalActivity: Partial<PhysicalActivity>;
  foodPreferences: Partial<FoodPreferences>;
  cookingOrganization: Partial<CookingOrganization>;
  homeSupport: Partial<HomeSupport>;
  uploadedFiles: UploadedFile[];
  additionalNotes: string;
  consentGiven: boolean;
}

export const MEDICAL_CONDITIONS = [
  'סוכרת סוג 1',
  'סוכרת סוג 2',
  'פרה-סוכרת',
  'יתר לחץ דם',
  'כולסטרול גבוה',
  'מחלת לב',
  'תת פעילות בלוטת התריס',
  'יתר פעילות בלוטת התריס',
  'תסמונת מטבולית',
  'PCOS',
  'מחלת כליות',
  'מחלת כבד',
  'מחלת מעי דלקתית',
  'תסמונת המעי הרגיז',
  'ריפלוקס / GERD',
  'אוסטיאופורוזיס',
  'אנמיה',
  'סרטן (בעבר או כיום)',
  'אין מצב רפואי ידוע',
];

export const ACTIVITY_TYPES = [
  'הליכה',
  'ריצה',
  'רכיבה על אופניים',
  'שחייה',
  'אימוני כוח / חדר כושר',
  'יוגה / פילאטיס',
  'ריקוד',
  'ספורט קבוצתי',
  'אימון פונקציונלי',
  'HIIT',
];

export const KITCHEN_EQUIPMENT = [
  'מיקסר / בלנדר',
  'סיר לחץ / סיר מרק חשמלי',
  'תנור',
  'מיקרוגל',
  'מחבת / גריל',
  'מעבד מזון',
  'מדחום מטבח',
  'משקל מטבח',
];
