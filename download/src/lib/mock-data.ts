import { User, Friend, DiningHall, CalendarEvent, Device } from './types';
import { addDays, set } from 'date-fns';

export const mockUsers: User[] = [
  {
    uid: 'user1',
    displayName: 'Chris',
    email: 'chris@healthpal.ai',
    avatarUrl: 'https://picsum.photos/seed/chris/200/200',
    campus: 'UofX',
    premium: true,
    medicalProfile: {
      dob: '1998-05-20',
      bloodType: 'O+',
      allergies: ['lactose'],
      conditions: ['Asthma'],
      medications: [{ name: 'Albuterol', dose: 'As needed' }],
      emergencyContact: { name: 'Jane Doe', phone: '123-456-7890' },
    },
    fitnessProfile: {
      height_cm: 180,
      weight_kg: 75,
      restingHR: 55,
      typicalWeeklyActivities: ['running', 'tennis', 'gym'],
    },
  },
  {
    uid: 'user2',
    displayName: 'Sam',
    email: 'sam@example.com',
    avatarUrl: 'https://picsum.photos/seed/sam/200/200',
    campus: 'UofX',
  },
  {
    uid: 'user3',
    displayName: 'Alex',
    email: 'alex@example.com',
    avatarUrl: 'https://picsum.photos/seed/alex/200/200',
    campus: 'UofX',
  },
  {
    uid: 'user4',
    displayName: 'Taylor',
    email: 'taylor@example.com',
    avatarUrl: 'https://picsum.photos/seed/taylor/200/200',
    campus: 'UofY',
  },
];

export const mockFriends: Friend[] = [
  {
    uid: 'user2',
    displayName: 'Sam',
    email: 'sam@example.com',
    avatarUrl: 'https://picsum.photos/seed/sam/200/200',
    permissions: { shareAvailability: true, shareActivitySummary: true },
  },
  {
    uid: 'user3',
    displayName: 'Alex',
    email: 'alex@example.com',
    avatarUrl: 'https://picsum.photos/seed/alex/200/200',
    permissions: { shareAvailability: true, shareActivitySummary: false },
  },
];

export const mockDiningHalls: DiningHall[] = [
  {
    id: 'dh1',
    campusId: 'UofX',
    hallName: 'West Dining Hall',
    menuDate: new Date().toISOString().split('T')[0],
    isMock: true,
    meals: [
      {
        mealId: 'm1',
        name: 'Quinoa Power Bowl',
        station: 'Greens & Grains',
        calories: 650,
        ingredients: ['quinoa', 'black beans', 'corn', 'avocado', 'salsa'],
        tags: ['vegan', 'vegetarian', 'contains-gluten'],
      },
      {
        mealId: 'm2',
        name: 'Grilled Chicken Caesar Salad',
        station: 'Salad Bar',
        calories: 750,
        ingredients: ['chicken', 'romaine', 'parmesan', 'croutons', 'caesar dressing'],
        tags: ['contains-gluten'],
      },
      {
        mealId: 'm3',
        name: 'Beyond Burger',
        station: 'Grill',
        calories: 800,
        ingredients: ['beyond patty', 'lettuce', 'tomato', 'bun'],
        tags: ['vegan', 'vegetarian'],
      },
      {
        mealId: 'm4',
        name: 'Lentil Soup',
        station: 'Soups',
        calories: 350,
        ingredients: ['lentils', 'carrots', 'celery', 'onion'],
        tags: ['vegan', 'vegetarian'],
      },
    ],
  },
];

const now = new Date();

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'ce1',
    userId: 'user1',
    title: 'CS101 Lecture',
    startAt: set(now, { hours: 10, minutes: 0, seconds: 0, milliseconds: 0 }),
    endAt: set(now, { hours: 11, minutes: 30, seconds: 0, milliseconds: 0 }),
    source: 'app',
    attendees: [],
    createdBy: 'user1',
    createdAt: now,
  },
  {
    id: 'ce2',
    userId: 'user1',
    title: 'Midterm Exam Prep',
    startAt: addDays(set(now, { hours: 14, minutes: 0, seconds: 0, milliseconds: 0 }), 2),
    endAt: addDays(set(now, { hours: 16, minutes: 0, seconds: 0, milliseconds: 0 }), 2),
    source: 'app',
    attendees: [],
    createdBy: 'user1',
    createdAt: now,
  },
];

export const mockDevices: Device[] = [
    {
        deviceId: 'dev1',
        userId: 'user1',
        source: 'mock',
        dataType: 'running',
        lastSynced: addDays(now, -1),
        data: {
            distance_km: 10,
            duration_min: 55,
            calories: 700,
            heartRateAvg: 160
        }
    },
    {
        deviceId: 'dev2',
        userId: 'user1',
        source: 'mock',
        dataType: 'gym_workout',
        lastSynced: addDays(now, -3),
        data: {
            duration_min: 75,
            calories: 500,
            heartRateAvg: 130
        }
    }
]
