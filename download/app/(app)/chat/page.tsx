'use client';

import { useState } from 'react';
import { ChatMessage } from '@/lib/types';
import { ChatLayout } from '@/components/app/chat-layout';
import { generateActionPreviewMarkdown } from '@/ai/flows/generate-action-preview-markdown';
import { contextAwareWorkoutPlanning } from '@/ai/flows/context-aware-workout-planning';
import { intelligentMealSuggestion } from '@/ai/flows/intelligent-meal-suggestion';
import { draftEmailForGymRefund } from '@/ai/flows/draft-email-for-gym-refund';
import { medicalProfileDisclaimer } from '@/ai/flows/medical-profile-disclaimer';
import { useAuth } from '@/lib/auth';
import { ActionCard } from '@/components/app/action-card';
import { MealSuggestionCard } from '@/components/app/meal-suggestion-card';
import ReactMarkdown from 'react-markdown';
import { mockDiningHalls, mockUsers } from '@/lib/mock-data';

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Hello! I am HealthPal AI. How can I help you today? You can ask me to schedule workouts, find meals, or even match you with a workout buddy.',
      createdAt: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleSend = async () => {
    if (!input.trim() || !user) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(async () => {
      let assistantResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: "I'm not sure how to help with that. Could you try rephrasing?",
        createdAt: new Date(),
      };

      try {
        if (input.toLowerCase().includes('schedule') || input.toLowerCase().includes('tennis')) {
          const payload = {
            start: new Date(Date.now() + 86400000 * 2).toISOString(),
            end: new Date(Date.now() + 86400000 * 2 + 3600000).toISOString(),
            attendees: ['sam@example.com'],
            location: 'Campus Courts',
            title: 'Tennis Match',
          };
          const preview = await generateActionPreviewMarkdown({
            actionType: 'CREATE_CAL_EVENT',
            payload,
          });
          assistantResponse.text =
            "I found a free slot for a tennis match tomorrow. Sam is also available. Shall I schedule it?";
          assistantResponse.component = (
            <ActionCard
              actionType="CREATE_CAL_EVENT"
              payload={payload}
              previewMarkdown={preview.actionPreviewMarkdown}
            />
          );
        } else if (input.toLowerCase().includes('meal') || input.toLowerCase().includes('dining')) {
            const mealSuggestion = await intelligentMealSuggestion({
                diningHall: 'West Dining Hall',
                date: new Date().toISOString().split('T')[0],
                calorieGoal: 700,
                dietaryRestrictions: ['vegetarian'],
                allergens: ['dairy']
            });
            // Let's use mock data for the result
            const mockSuggestions = mockDiningHalls[0].meals.filter(m => m.tags.includes('vegetarian') && !m.tags.includes('dairy'));
            
            assistantResponse.text = "Here are some meal suggestions from West Dining Hall based on your preferences:";
            assistantResponse.component = <MealSuggestionCard suggestions={mockSuggestions} />
        } else if (input.toLowerCase().includes('refund')) {
          const emailDraft = await draftEmailForGymRefund({
            userName: user.displayName || "Chris",
            gymName: 'Campus Gym',
            reason: 'Moving to a new city',
          });
           const payload = {
            to: 'support@campusgym.com',
            subject: emailDraft.emailSubject,
            body: emailDraft.emailBody,
          };
          const preview = await generateActionPreviewMarkdown({
            actionType: 'SEND_EMAIL',
            payload,
          });
          assistantResponse.text = "I've drafted a refund request email for you. Would you like to send it?";
          assistantResponse.component = (
             <ActionCard
              actionType="SEND_EMAIL"
              payload={payload}
              previewMarkdown={preview.actionPreviewMarkdown}
            />
          );
        } else if (input.toLowerCase().includes('plan my week') || input.toLowerCase().includes('workout plan')) {
          const plan = await contextAwareWorkoutPlanning({
            examSchedule: 'Midterm on Wednesday',
            recentWorkoutIntensity: 'High - ran 10k yesterday',
            recoveryNeeds: 'Focus on light activity and recovery',
            fitnessGoals: 'Maintain cardio, build strength',
          });
          assistantResponse.text = "Here is a workout plan for your week, considering your exams and recent activity:"
          assistantResponse.component = <div className="prose prose-sm dark:prose-invert rounded-md border p-4"><ReactMarkdown>{plan.workoutPlan}</ReactMarkdown></div>

        } else if (input.toLowerCase().includes('headache') || input.toLowerCase().includes('medical')) {
           const medicalInfo = await medicalProfileDisclaimer({
               query: "What should I do for a headache?",
               medicalProfile: user.medicalProfile || null
           })
           // Use mock response for consistency
           assistantResponse.text = `For a common headache, you can try resting, drinking water, or taking over-the-counter pain relievers like ibuprofen or acetaminophen. Since you have a history of Asthma, it's generally safe, but always follow package directions.\n\n**Disclaimer:** This is informational only and not a substitute for professional medical advice. For urgent issues, contact emergency services.`
           assistantResponse.component = <div className="text-xs text-muted-foreground mt-2">Sources: <a href="#" className="underline">Mayo Clinic</a>, <a href="#" className="underline">CDC</a></div>
        }
      } catch (e) {
        console.error(e);
        assistantResponse.text = "Sorry, I encountered an error while processing your request.";
      }

      setMessages((prev) => [...prev, assistantResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
       <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800/50 px-4 py-2 text-center text-xs text-amber-800 dark:text-amber-300">
        <strong>Medical Disclaimer:</strong> AI suggestions are for informational purposes only and not a substitute for professional medical advice.
       </div>
      <ChatLayout
        messages={messages}
        input={input}
        onInputChange={setInput}
        onSend={handleSend}
        isLoading={isLoading}
        userAvatarUrl={user?.avatarUrl || ''}
        userDisplayName={user?.displayName || 'User'}
      />
    </div>
  );
}
