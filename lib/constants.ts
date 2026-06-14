export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry",
];

export const BELT_OPTIONS = [
  { value: "WHITE",  label: "White Belt  (10th Kyu)" },
  { value: "YELLOW", label: "Yellow Belt (9th–8th Kyu)" },
  { value: "ORANGE", label: "Orange Belt (7th–6th Kyu)" },
  { value: "GREEN",  label: "Green Belt  (5th Kyu)" },
  { value: "BLUE",   label: "Blue Belt   (4th Kyu)" },
  { value: "BROWN",  label: "Brown Belt  (3rd–1st Kyu)" },
  { value: "BLACK",  label: "Black Belt  (Dan)" },
];

export const KARATE_STYLES = [
  "Shotokan", "Goju-Ryu", "Shito-Ryu", "Wado-Ryu", "Kyokushin",
  "Shorin-Ryu", "Uechi-Ryu", "Isshin-Ryu", "Okinawa-Te", "Other",
];

export const AGE_CATEGORIES = [
  { label: "Under 8 Yrs",    range: "6–7 Yrs",    kumite: "1 Min",     weights: ["Below 20 kg", "21–25 kg", "26–30 kg"] },
  { label: "Under 10 Yrs",   range: "8–9 Yrs",    kumite: "1 Min",     weights: ["Below 20 kg", "21–25 kg", "26–30 kg", "31–35 kg"] },
  { label: "Under 12 Yrs",   range: "10–11 Yrs",  kumite: "1 Min",     weights: ["26–30 kg", "31–35 kg", "36–40 kg", "41–45 kg"] },
  { label: "Under 14 Yrs",   range: "12–13 Yrs",  kumite: "1 Min",     weights: ["31–35 kg", "36–40 kg", "41–45 kg", "46–50 kg", "51–55 kg"] },
  { label: "Under 16 Yrs",   range: "14–15 Yrs",  kumite: "1 Min",     weights: ["41–45 kg", "46–50 kg", "51–55 kg", "56–60 kg", "61–65 kg"] },
  { label: "Under 18 Yrs",   range: "16–17 Yrs",  kumite: "1 Min",     weights: ["51–55 kg", "56–60 kg", "61–65 kg", "66–70 kg", "70 kg & Above"] },
  { label: "Above 18+ Yrs",  range: "Open",        kumite: "1.5 Mins or TBD on Match Day",  weights: ["56–60 kg", "61–65 kg", "66–70 kg", "70 kg & Above"] },
];

export const WEIGHT_CLASSES = [
  "Below 20 kg", "21–25 kg", "26–30 kg", "31–35 kg",
  "36–40 kg", "41–45 kg", "46–50 kg", "51–55 kg",
  "56–60 kg", "61–65 kg", "66–70 kg", "70 kg & Above",
];

export const DECLARATION_TEXT = `I, the undersigned, do hereby volunteer my application for the attendance and participation in OMAKKA CUP – All India Open Karate Championship 2026 directed by Kyoshi Vijay Shigwan on 2nd August, 2026 and do hereby assume full responsibility for all injuries, damages or losses that I may sustain or incur, if any, while participating. I do hereby waive all claims against Okinawa Martial Arts Karate Kobudo Association of the event individually or otherwise. I fully understand that any medical treatment given to me will be first aid type only. I certify that I am in good health and without injuries or physical disabilities. I further agree to conduct myself with decorum in the spirit of Karate.`;

export const EVENT_DATE = new Date("2026-08-02T08:30:00+05:30");
export const REGISTRATION_DEADLINE = new Date("2026-07-15T23:59:59+05:30");
