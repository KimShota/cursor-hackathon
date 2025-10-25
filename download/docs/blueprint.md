# **App Name**: HealthPal AI

## Core Features:

- Chat Interface: A chat-first interface for interacting with the HealthPal AI assistant, supporting both 'Ask' and 'Delegate' modes.
- Agentic Task Delegation: Delegate tasks to the AI assistant such as scheduling events, sending emails, and finding workout partners, all with explicit user confirmation via a confirm/cancel UI. It incorporates a tool to check which data the action will read, such as calendar slots, assignments, fitness windows, friends availability, and location, displayed clearly to the user.
- Buddy Matching: Find workout buddies based on sport, time, location, and fitness compatibility using verified friend data and opt-in community members.
- Dining Hall Suggestions: Receive meal suggestions from dining halls based on dietary restrictions (allergies, vegan, vegetarian), calorie count, and nutritional information.
- Calendar Integration: Sync with Google Calendar to create events, check free/busy slots, and send invites; also manages mock calendar events.
- Medical Profile Management: Securely store and manage medical profile information, including allergies, conditions, medications, and emergency contacts, with explicit user consent and disclaimers.
- Data Integration (Mock/Real): Integrate with mock data feeds (assignments, device activities, dining menus) and provide placeholders for real integrations (Strava, Apple Health, Google Calendar).
- Context-Aware Assistance: Utilize user's stored data (medical profile, calendar, devices, assignments) for personalized context in AI interactions.
- Data Privacy: Follows privacy constraints such as to produce human-readable summary of actions to take before any execution of said actions, list which data is accessed by each action and to wait for explicit user confirmation before acting. Additionally it will check medical profiles for allergies and conditions when assistant gives a medical suggestion
- Confirmation Flow: A 'confirmation' step where AI must check medical profile data such as allergies before it can confirm.
- User Authentication: A standard user authentication using Firebase including Google OAuth 2.
- Persistent Storage: Persistently store user and relevant structured application state to Firestore
- Friend Management: Allow for managing friends who can share availability and activities with you, if they grant permission.

## Style Guidelines:

- Primary color: Light HSL-derived Blue (#93B4E9) for a calm, trustworthy feel. The hue subtly evokes health without being cliché. 
- Background color: Very Light HSL-derived Blue (#F4F6F9), complementing the primary color for a clean, soft background.
- Accent color: Light HSL-derived Purple (#C4A9E0), analogous to the primary, yet provides visual interest.
- Body and headline font: 'Inter' sans-serif for a clean and modern user interface. 
- Use clean, minimalist icons to represent different actions and data points (calendar, fitness, dining).  
- Maintain a clean and organized layout, prioritizing the chat interface as the primary UX.  
- Employ subtle animations for transitions and feedback (e.g., message sending, event creation) to enhance user engagement.