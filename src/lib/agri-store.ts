import { createContext, useContext } from "react";

export type Lang = "en" | "hi";

export interface User {
  username: string;
  state: string;
}

export interface Notif {
  id: string;
  title: string;
  body: string;
  level: "info" | "warn" | "danger";
  time: string;
}

export interface AgriState {
  user: User | null;
  lang: Lang;
  dark: boolean;
  notifications: Notif[];
  history: { id: string; type: string; detail: string; time: string }[];
  login: (username: string, password: string) => boolean;
  signup: (username: string, password: string) => boolean;
  logout: () => void;
  setLang: (l: Lang) => void;
  toggleDark: () => void;
  setState: (s: string) => void;
  pushHistory: (type: string, detail: string) => void;
  markRead: (id: string) => void;
}

export const AgriContext = createContext<AgriState | null>(null);

export function useAgri() {
  const ctx = useContext(AgriContext);
  if (!ctx) throw new Error("useAgri must be used within AgriProvider");
  return ctx;
}

export const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
  "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
  "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
  "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu",
  "Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry",
];

export const T: Record<string, { en: string; hi: string }> = {
  appName: { en: "AgriGuard AI", hi: "एग्रीगार्ड एआई" },
  tagline: { en: "Predict. Protect. Prosper.", hi: "अनुमान। सुरक्षा। समृद्धि।" },
  login: { en: "Login", hi: "लॉगिन" },
  signup: { en: "Sign Up", hi: "साइन अप" },
  logout: { en: "Logout", hi: "लॉगआउट" },
  username: { en: "Username", hi: "उपयोगकर्ता नाम" },
  password: { en: "Password", hi: "पासवर्ड" },
  getStarted: { en: "Get Started", hi: "शुरू करें" },
  uploadCrop: { en: "Upload Crop Image", hi: "फसल छवि अपलोड करें" },
  dashboard: { en: "Dashboard", hi: "डैशबोर्ड" },
  scan: { en: "Crop Scan", hi: "फसल जांच" },
  market: { en: "Market", hi: "बाज़ार" },
  advisory: { en: "Advisory", hi: "सलाह" },
  profile: { en: "Profile", hi: "प्रोफ़ाइल" },
  welcome: { en: "Welcome", hi: "स्वागत है" },
  soilMoisture: { en: "Soil Moisture", hi: "मिट्टी की नमी" },
  soilQuality: { en: "Soil Quality", hi: "मिट्टी की गुणवत्ता" },
  diseaseRisk: { en: "Disease Risk", hi: "रोग जोखिम" },
  pestRisk: { en: "Pest Risk", hi: "कीट जोखिम" },
  irrigation: { en: "Irrigation", hi: "सिंचाई" },
  weather: { en: "Weather", hi: "मौसम" },
  soilPh: { en: "Soil pH", hi: "मिट्टी का पीएच" },
  recommendations: { en: "Smart Recommendations", hi: "स्मार्ट सुझाव" },
  analyze: { en: "Analyze", hi: "विश्लेषण करें" },
  preview: { en: "Preview", hi: "पूर्वावलोकन" },
  low: { en: "Low", hi: "कम" },
  medium: { en: "Medium", hi: "मध्यम" },
  high: { en: "High", hi: "उच्च" },
  safe: { en: "Safe", hi: "सुरक्षित" },
  notifications: { en: "Notifications", hi: "सूचनाएँ" },
  marketInsights: { en: "Crop Market Insights", hi: "फसल बाज़ार जानकारी" },
  profitTips: { en: "Profit Suggestions", hi: "लाभ सुझाव" },
  futureScope: { en: "Future Scope", hi: "भविष्य की योजना" },
  dailyTip: { en: "Daily Farming Tip", hi: "दैनिक खेती सुझाव" },
  chatbot: { en: "Ask AgriBot", hi: "एग्रीबॉट से पूछें" },
  selectState: { en: "Select your State", hi: "अपना राज्य चुनें" },
  recentActivity: { en: "Recent Activity", hi: "हाल की गतिविधि" },
  cropHealth: { en: "Crop Health", hi: "फसल स्वास्थ्य" },
};

export function t(key: string, lang: Lang): string {
  return T[key]?.[lang] ?? key;
}