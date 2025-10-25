export type User = {
  uid: string;
  displayName: string | null;
  email: string | null;
  avatarUrl: string | null;
  timezone?: string;
  campus?: string;
  roles?: string[];
  premium?: boolean;
  createdAt?: Date;
  lastActiveAt?: Date;
  medicalProfile?: MedicalProfile;
  fitnessProfile?: FitnessProfile;
  calendarSynced?: boolean;
  connectedServices?: {
    strava: boolean;
    apple: boolean;
    googleCalendar: boolean;
  };
  friendVerification?: {
    verified: boolean;
    verifiedBy: string | null;
    verifiedAt: Date | null;
  };
};

export type MedicalProfile = {
  dob: string | null; // Storing as string for easier form handling, e.g., "YYYY-MM-DD"
  bloodType: string | null;
  allergies: string[];
  conditions: string[];
  medications: Medication[];
  emergencyContact: EmergencyContact | null;
};

export type Medication = {
  name: string;
  dose: string;
  notes?: string;
};

export type EmergencyContact = {
  name: string;
  phone: string;
};

export type FitnessProfile = {
  height_cm: number | null;
  weight_kg: number | null;
  restingHR: number | null;
  typicalWeeklyActivities: string[];
};

export type Friend = {
  uid: string;
  displayName: string;
  email: string;
  avatarUrl: string;
  permissions: {
    shareAvailability: boolean;
    shareActivitySummary: boolean;
  };
};

export type Device = {
  deviceId: string;
  userId: string;
  source: "mock" | "strava" | "apple";
  dataType: string;
  lastSynced: Date;
  data: Record<string, any>;
};

export type DiningHall = {
  id: string;
  campusId: string;
  hallName: string;
  menuDate: string; // "YYYY-MM-DD"
  meals: Meal[];
  sourceInfo?: string;
  isMock: boolean;
};

export type Meal = {
  mealId: string;
  name: string;
  station: string;
  calories: number | null;
  ingredients: string[];
  tags: ("vegan" | "vegetarian" | "dairy" | "contains-gluten")[];
  notes?: string;
};

export type Assignment = {
  id: string;
  userId: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: Date;
  source: "brightspace" | "manual";
  priority: "low" | "medium" | "high";
  createdAt: Date;
};

export type ChatMessage = {
  id: string;
  sender: "user" | "assistant" | "system";
  text: string;
  createdAt: Date;
  component?: React.ReactNode;
  metadata?: {
    actionRequests?: boolean;
    sourceDataRefs?: string[];
  };
};

export type CalendarEvent = {
  id: string;
  userId: string;
  title: string;
  startAt: Date;
  endAt: Date;
  source: "google" | "app";
  attendees: string[];
  createdBy: string;
  createdAt: Date;
  linkedAssignmentId?: string | null;
  agentActionLogId?: string | null;
};

export type AgentAction = {
  actionId: string;
  userId: string;
  chatId: string;
  actionType: "CREATE_CAL_EVENT" | "SEND_EMAIL" | "MATCH_BUDDY";
  payload: Record<string, any>;
  requestedAt: Date;
  confirmed: boolean;
  executedAt?: Date;
  result?: "success" | "failure";
  error?: string;
};
