# SyncOS Companion

**SyncOS Companion** is an all-in-one **AI-powered productivity and health assistant** for students and young professionals. It unifies fragmented apps — calendars, fitness trackers, meal planners, and social connections — into a **single conversational interface**, helping you optimize health, productivity, and social activity.  

---

## ⚡ Features

### 1. Chat-First AI Assistant
- Conversational interface that understands your schedule, fitness goals, dietary preferences, and medical profile.  
- Can propose **agentic actions**, e.g., create calendar events, send emails, or match workout buddies.  
- Provides **medical suggestions** from reputable sources with disclaimers.

### 2. Friends & Social Health
- Add and verify friends; manage sharing preferences (availability, activity, minimal medical info).  
- **Buddy matching** for workouts, sports, or study sessions.  
- **Accountability circles** with small challenges and progress tracking.  
- Suggested matches based on availability, location, and fitness goals.

### 3. Calendar Integration
- Mock Google Calendar sync for demo mode.  
- Shows free/busy slots for user + verified friends.  
- Create events directly from chat suggestions (requires confirmation).  

### 4. Meal Planning
- Suggests meals from campus dining halls (mocked for hackathon).  
- Filters by dietary restrictions, allergens, calories, and preferences.  
- Option to add meals to your calendar with reminders.

### 5. Fitness & Device Tracking
- Mock integration with Apple Health / Strava for activity data.  
- Tracks runs, gym sessions, heart rate averages, calories burned.  
- AI assistant suggests workouts and recovery days based on real-time activity.

### 6. Agentic Actions
- Create calendar events  
- Send emails / notifications  
- Invite friends to activities  
- AI proposes actions with **clear previews** and requires user confirmation before execution.

### 7. Premium Features (Stub / Future)
- Verified buddy matching  
- Unlimited buddy invites  
- Advanced health-performance dashboards  
- Lifestyle perks via partner brands

---

## 📂 Project Structure

- `/pages` – Next.js pages:  
  - `/` — Landing page & login/demo toggle  
  - `/onboard` — Onboarding wizard  
  - `/chat` — Chat-first assistant interface  
  - `/friends` — Health Network (friends + circles)  
  - `/profile` — Medical & fitness profile  
  - `/calendar` — Condensed weekly calendar  
  - `/dining` — Dining hall menu viewer  
  - `/settings` — Integrations, API keys, privacy  
  - `/demo-setup` — Hackathon mock data seeder

- `/components` – Reusable UI elements:  
  - `ChatWindow`, `MessageBubble`, `ActionCard`, `BuddyMatchCard`, `MealSuggestionCard`, `CalendarFreeBusyStrip`, `QuickActionsBar`

- `/lib` – Supabase client (`supabaseClient.ts`)  
- `/functions` – Firebase Cloud Functions (ai-chat-handler, executeAgentAction, seeders, webhooks)  
- `/demo` – Demo script & pre-seeded mock data

---

## 🔧 Tech Stack

- **Frontend:** Next.js + TypeScript + TailwindCSS + Framer Motion  
- **Backend / Data:** Firebase Cloud Functions (AI agent, webhooks)  
- **Database:** Firestore (hackathon demo) / Supabase (future)  
- **AI:** OpenAI GPT for chat + agentic actions  
- **Notifications:** Firebase Cloud Messaging + SendGrid (email)  
- **Authentication:** Firebase Auth / Supabase Auth (future)

---

## ⚡ Setup & Running Locally

1. Clone the repo:
```bash
git clone https://github.com/KimShota/cursor-hackathon.git
cd cursor-hackathon
