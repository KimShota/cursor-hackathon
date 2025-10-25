"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  HeartPulse, 
  Users, 
  UtensilsCrossed, 
  Check, 
  Star,
  ArrowRight,
  MessageCircle,
  Play,
  Shield,
  Target,
  Clock,
  TrendingUp,
  Coffee,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useEffect, useState } from "react";

// Integrations data
const integrations = [
  { name: 'Google Calendar', slug: 'gcal', tier: 'oauth-ready' },
  { name: 'Gmail', slug: 'gmail', tier: 'oauth-ready' },
  { name: 'Apple Health', slug: 'healthkit', tier: 'bridge' },
  { name: 'Strava', slug: 'strava', tier: 'oauth-ready' },
  { name: 'Fitbit', slug: 'fitbit', tier: 'coming-soon' },
  { name: 'Garmin', slug: 'garmin', tier: 'coming-soon' },
  { name: 'Brightspace', slug: 'brightspace', tier: 'mock-friendly' },
  { name: 'Canvas LMS', slug: 'canvas', tier: 'mock-friendly' },
  { name: 'Outlook', slug: 'outlook', tier: 'oauth-ready' },
  { name: 'Zoom', slug: 'zoom', tier: 'oauth-ready' },
  { name: 'Slack', slug: 'slack', tier: 'oauth-ready' },
  { name: 'Notion', slug: 'notion', tier: 'coming-soon' },
  { name: 'Trello', slug: 'trello', tier: 'coming-soon' },
  { name: 'iCal', slug: 'ical', tier: 'basic' },
];

// Value propositions
const valueProps = [
  {
    icon: TrendingUp,
    title: "Smarter Weeks",
    description: "Auto-schedule workouts around exams and deadlines",
    demo: "Plan my week around finals and a 10k recovery"
  },
  {
    icon: Users,
    title: "Buddy Matching",
    description: "Verified friend availability + fitness compatibility",
    demo: "Find a tennis partner for Wednesday evening"
  },
  {
    icon: UtensilsCrossed,
    title: "Eat Well, Fast",
    description: "Dining hall filters for calories & allergens",
    demo: "Show me vegan options under 600 calories"
  },
  {
    icon: Shield,
    title: "Audit & Control",
    description: "Every action logged; confirm/cancel always",
    demo: "Review all actions taken this week"
  }
];

// Pricing plans
const pricingPlans = [
  {
    name: "Free (Demo Mode)",
    price: "$0",
    period: "forever",
    description: "For hackathons & trials",
    features: [
      "Mock data, sample friends, seeded menus",
      "Chat & action previews",
      "No external API calls",
      "Basic support"
    ],
    cta: "Try Demo",
    popular: false,
    badge: "Demo Mode"
  },
  {
    name: "Student Pro",
    price: "$5",
    period: "per month",
    description: "For active students",
    features: [
      "Real integrations (GCal, Strava, HealthKit*)",
      "Buddy matching (verified friends)",
      "Dining filters & weekly plans",
      "Priority support",
      "Campus dining integration"
    ],
    cta: "Start Pro Trial",
    popular: true
  },
  {
    name: "Clubs & Teams",
    price: "$49",
    period: "per month",
    description: "For organizations",
    features: [
      "Shared rosters, availability, invites",
      "Team dashboards & events",
      "Early partner rewards",
      "Admin analytics",
      "Dedicated support"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

// Testimonials
const testimonials = [
  {
    name: "Sarah Chen",
    role: "CS Student, Stanford",
    content: "It planned my finals week workouts in 30 seconds.",
    rating: 5
  },
  {
    name: "Marcus Johnson", 
    role: "Software Engineer",
    content: "Our club filled scrimmages faster with verified availability.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Grad Student, MIT", 
    content: "Dining picks that actually match my allergies.",
    rating: 5
  }
];

// Community partners
const partners = [
  {
    name: "Campus Coffee Co.",
    perk: "Latte on us after 4-week streak",
    location: "Downtown"
  },
  {
    name: "FitLife Gym",
    perk: "Free class after 10 workouts",
    location: "Campus"
  },
  {
    name: "Green Smoothie Bar",
    perk: "20% off after 5 healthy meals",
    location: "Student Union"
  },
  {
    name: "Study Spot Cafe",
    perk: "Free coffee with study buddy meetup",
    location: "Library"
  }
];

// FAQ
const faq = [
  {
    question: "Do I need API keys to try it?",
    answer: "No, Demo Mode uses mock data so you can experience everything without any setup."
  },
  {
    question: "What actions can the assistant take?",
    answer: "It proposes calendar events, meal suggestions, and buddy matches—then acts only after you confirm."
  },
  {
    question: "How do buddy matches work?",
    answer: "Based on availability, preferences, and fitness compatibility. You control what data is shared."
  },
  {
    question: "What sources power dining suggestions?",
    answer: "Mock campus dining data now; real sources will be added per campus partnership."
  },
  {
    question: "Will this replace my calendar app?",
    answer: "No, it augments and syncs with your existing tools to make them smarter."
  },
  {
    question: "Is medical advice provided?",
    answer: "Information only—not a substitute for professional medical advice. Always consult healthcare providers."
  }
];

// Journey milestones
const journeyMilestones = [
  {
    title: "Problem Interviews",
    description: "Top 5 pain points: calendar chaos, meal indecision, flaky workouts, etc.",
    artifacts: ["Interview notes", "Pain point map"]
  },
  {
    title: "Lo-fi Flows", 
    description: "Chat-first → confirmation modal → audit log",
    artifacts: ["Wireframes", "User flows"]
  },
  {
    title: "Mock Data Seeding",
    description: "Devices, dining, assignments for realistic demos",
    artifacts: ["Data model", "Seed scripts"]
  },
  {
    title: "Buddy Matching v0",
    description: "Availability + preferences heuristic",
    artifacts: ["Algorithm design", "Matching logic"]
  },
  {
    title: "Demo Feedback",
    description: "User testing and what's next",
    artifacts: ["Feedback notes", "Roadmap"]
  }
];

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/chat");
    }
    // Check for demo mode
    const urlParams = new URLSearchParams(window.location.search);
    setIsDemoMode(urlParams.get('demo') === 'true');
  }, [user, router]);

  if (loading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Demo Mode Banner */}
      {isDemoMode && (
        <div className="bg-amber-500/10 border-b border-warning/20 py-2 text-center text-sm text-amber-500-800">
          <Badge className="bg-amber-500/20 text-amber-500-800 border-warning/30">
            Demo Mode - Using Mock Data
          </Badge>
        </div>
      )}

      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-screen-xl px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm">
                <HeartPulse className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 font-sora">SyncOS</span>
          </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#product" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">Product</Link>
              <Link href="#integrations" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">Integrations</Link>
              <Link href="#pricing" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">Pricing</Link>
              <Link href="#community" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">Community</Link>
              <Link href="#journey" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">Journey</Link>
              <Link href="#faq" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">FAQ</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="text-slate-700 hover:text-slate-900">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild className="bg-indigo-600 hover:bg-indigo-600-700 text-white px-6 py-2 rounded-full font-medium shadow-sm">
                <Link href="/?demo=true">Try Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
          <div className="mx-auto max-w-screen-xl px-6 pt-28 pb-20">
            <div className="grid items-center gap-12 md:grid-cols-2">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h1 className="text-5xl font-bold tracking-tight text-slate-900 md:text-6xl font-sora">
                    One chat that syncs your <span className="text-indigo-600">health</span>, studies, and life.
              </h1>
                  <p className="text-xl text-slate-700 max-w-2xl leading-relaxed">
                    A campus-ready, agentic Health & Productivity OS that unifies calendar, workouts, dining, and buddies—then acts with your confirmation.
                  </p>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <Button asChild className="bg-indigo-600 hover:bg-indigo-600-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all">
                    <Link href="/?demo=true">
                      Try the Demo (Mock Data)
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-4 rounded-full text-lg font-medium">
                    <Play className="mr-2 h-5 w-5" />
                    Watch 60-sec Overview
                </Button>
                  <Button variant="outline" className="bg-white text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 px-8 py-4 rounded-full text-lg font-medium">
                    Sign in with Google
                </Button>
                </div>
                
                <p className="text-sm text-slate-700/70">No actions are taken without your confirmation.</p>
              </div>
              
              {/* Right Visual */}
              <div className="relative">
                {/* Main Video Container */}
                <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-center shadow-lg">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-indigo-600/10 rounded-full flex items-center justify-center mx-auto">
                      <Play className="h-10 w-10 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-slate-700 font-medium">Product demo video placeholder</p>
                      <p className="text-sm text-slate-700/60">60-second overview</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating UI Chips */}
                <div className="pointer-events-none absolute -bottom-6 -left-8 hidden md:block">
                  <div className="rounded-2xl bg-white px-4 py-3 text-sm shadow-lg border border-slate-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-slate-900 font-medium">Strava connected ✓</span>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute -top-6 -right-8 hidden md:block">
                  <div className="rounded-2xl bg-white px-4 py-3 text-sm shadow-lg border border-slate-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span className="text-slate-900 font-medium">Exam next Tue</span>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute top-1/2 -right-12 hidden md:block">
                  <div className="rounded-2xl bg-white px-4 py-3 text-sm shadow-lg border border-slate-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                      <span className="text-slate-900 font-medium">Dining: vegan 620 kcal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="product" className="py-24 bg-white">
          <div className="mx-auto max-w-screen-xl px-6">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-slate-900 mb-6 font-sora">How It Works (Chat-first)</h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
                Three simple steps to smarter scheduling and healthier habits
              </p>
            </div>
            
            {/* Steps Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1: Ask */}
              <Card className="p-8 text-center rounded-2xl border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-indigo-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-indigo-600">1</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-sora">Ask</h3>
                <p className="text-slate-700 mb-6 text-lg">"Plan my week around finals and a 10k recovery."</p>
                <div className="bg-slate-50 rounded-2xl p-6 text-left">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-slate-700">"I found free slots Tuesday 5-6pm and Thursday 7-8pm."</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-slate-700">"I recommend Tuesday because you have no assignments due the next day and Sam is free."</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 2: See */}
              <Card className="p-8 text-center rounded-2xl border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-indigo-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-indigo-600">2</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-sora">See</h3>
                <p className="text-slate-700 mb-6 text-lg">Assistant shows free slots, meals, and buddies; always asks to confirm.</p>
                <div className="bg-slate-50 rounded-2xl p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-900">Create Tennis Event?</span>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <Button size="sm" className="bg-emerald-500 hover:bg-emerald-500/90 text-white px-6 py-2 rounded-full">
                        ✓ Confirm
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-200 text-slate-700 px-6 py-2 rounded-full">
                        ✗ Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 3: Sync */}
              <Card className="p-8 text-center rounded-2xl border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-indigo-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-indigo-600">3</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-sora">Sync</h3>
                <p className="text-slate-700 mb-6 text-lg">Creates calendar events, emails invites, logs actions.</p>
                <div className="bg-slate-50 rounded-2xl p-6 text-left">
                  <div className="space-y-3">
                    <div className="flex items-center text-emerald-500">
                      <Check className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span className="text-sm font-medium">Calendar event created</span>
                    </div>
                    <div className="flex items-center text-emerald-500">
                      <Check className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span className="text-sm font-medium">Email sent to Sam</span>
                    </div>
                    <div className="flex items-center text-emerald-500">
                      <Check className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span className="text-sm font-medium">Action logged</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Disclaimer */}
            <div className="text-center mt-12">
              <p className="text-sm text-slate-700/70 bg-slate-50/50 rounded-full px-6 py-3 inline-block">
                Medical info is informational only. Actions require explicit confirmation.
              </p>
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section id="integrations" className="py-24 bg-slate-50">
          <div className="mx-auto max-w-screen-xl px-6">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-slate-900 mb-6 font-sora">100+ Integrations</h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
                Connect what you already use. Start with mock data, add real integrations later.
              </p>
            </div>
            
            {/* Integrations Grid */}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {integrations.map((integration) => (
                <div key={integration.slug} className="group flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg hover:border-indigo-600/20">
                  <div className="text-center space-y-3">
                    <div className="h-14 w-14 bg-indigo-600/5 rounded-xl mx-auto flex items-center justify-center group-hover:bg-indigo-600/10 transition-colors">
                      <span className="text-sm font-bold text-indigo-600">{integration.name.split(' ')[0]}</span>
                    </div>
                    <div className="text-sm text-slate-900 font-medium">{integration.name}</div>
                    <Badge 
                      className={`text-xs px-3 py-1 rounded-full ${
                        integration.tier === 'oauth-ready' ? 'bg-emerald-500/10 text-emerald-500 border-mint/20' :
                        integration.tier === 'mock-friendly' ? 'bg-indigo-600/10 text-indigo-600 border-brand/20' :
                        integration.tier === 'bridge' ? 'bg-amber-500/10 text-amber-500 border-warning/20' :
                        'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {integration.tier === 'oauth-ready' ? 'OAuth Ready' :
                       integration.tier === 'mock-friendly' ? 'Mock-friendly' :
                       integration.tier === 'bridge' ? 'Bridge' :
                       'Coming Soon'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA */}
            <div className="text-center mt-12">
              <Button variant="outline" className="text-slate-700 hover:text-slate-900 border-slate-200 hover:border-indigo-600 px-8 py-3 rounded-full font-medium">
                See all integrations <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-screen-xl px-6">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-slate-900 mb-6 font-sora">Health & Campus Outcomes</h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
                Four key ways SyncOS makes your life better
              </p>
            </div>
            
            {/* Value Props Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {valueProps.map((prop, index) => (
                <Card key={index} className="p-8 text-center rounded-2xl border-slate-200 shadow-sm hover:shadow-lg transition-all group">
                  <div className="w-16 h-16 bg-indigo-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-600/20 transition-colors">
                    <prop.icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 font-sora">{prop.title}</h3>
                  <p className="text-slate-700 mb-6 text-lg leading-relaxed">{prop.description}</p>
                  <div className="bg-slate-50 rounded-2xl p-6 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-slate-700 italic">"{prop.demo}"</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Community Rewards */}
        <section id="community" className="py-24 bg-slate-50">
          <div className="mx-auto max-w-screen-xl px-6">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-slate-900 mb-6 font-sora">Community Rewards</h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
                Move more → earn more (locally). Partnered with local coffee shops and gyms to reward healthy habits.
              </p>
            </div>
            
            {/* Partners Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {partners.map((partner, index) => (
                <Card key={index} className="p-8 text-center rounded-2xl border-slate-200 shadow-sm hover:shadow-lg transition-all group">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-500/20 transition-colors">
                    <Coffee className="h-8 w-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-sora">{partner.name}</h3>
                  <p className="text-slate-700 mb-3 text-lg">{partner.perk}</p>
                  <p className="text-sm text-slate-700/70 bg-slate-50/50 rounded-full px-4 py-2 inline-block">{partner.location}</p>
                </Card>
              ))}
            </div>
            
            {/* CTA */}
            <div className="text-center mt-12">
              <Button variant="outline" className="text-slate-700 hover:text-slate-900 border-slate-200 hover:border-indigo-600 px-8 py-3 rounded-full font-medium">
                Become a partner <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 bg-white">
          <div className="mx-auto max-w-screen-xl px-6">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-slate-900 mb-6 font-sora">Simple, Transparent Pricing</h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
                Start free, upgrade when you're ready. No hidden fees, no surprises.
              </p>
            </div>
            
            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan) => (
                <Card key={plan.name} className={`relative rounded-2xl border-slate-200 shadow-sm hover:shadow-lg transition-all ${plan.popular ? 'border-brand shadow-lg scale-105' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-6 py-2 rounded-full font-medium">
                      Most Popular
                    </Badge>
                  )}
                  {plan.badge && (
                    <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-amber-500/10 text-amber-500 border-warning/20 px-6 py-2 rounded-full font-medium">
                      {plan.badge}
                    </Badge>
                  )}
                  <CardHeader className="p-8 pb-6">
                    <CardTitle className="text-2xl font-bold text-slate-900 font-sora">{plan.name}</CardTitle>
                    <CardDescription className="text-slate-700 text-lg">{plan.description}</CardDescription>
                    <div className="mt-6">
                      <span className="text-5xl font-bold text-slate-900">{plan.price}</span>
                      <span className="text-slate-700 text-xl">/{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full py-4 rounded-full text-lg font-medium ${
                        plan.popular 
                          ? 'bg-indigo-600 hover:bg-indigo-600-700 text-white shadow-lg' 
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`} 
                      variant={plan.popular ? 'default' : 'outline'}
                      asChild
                    >
                      <Link href="/signup">{plan.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Footer Note */}
            <div className="text-center mt-12">
              <p className="text-slate-700/70 bg-slate-50/50 rounded-full px-6 py-3 inline-block">
                Demo Mode uses mock data so you can try everything without any API keys.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-slate-50">
          <div className="mx-auto max-w-screen-xl px-6">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-slate-900 mb-6 font-sora">Loved by Students & Professionals</h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
                See what our users are saying about SyncOS
              </p>
            </div>
            
            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-8 rounded-2xl border-slate-200 shadow-sm hover:shadow-lg transition-all">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-500 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-slate-700 mb-6 text-lg leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="border-t border-slate-200 pt-4">
                    <div className="font-bold text-slate-900 text-lg">{testimonial.name}</div>
                    <div className="text-slate-700/70">{testimonial.role}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section id="journey" className="py-24 bg-white">
          <div className="mx-auto max-w-screen-xl px-6">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-slate-900 mb-6 font-sora">Our Journey</h2>
              <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
                We interviewed students and recent grads to understand daily friction across schedules, workouts, and food. 
                Here's how those insights shaped our MVP—and what we're testing next.
              </p>
            </div>
            
            {/* Journey Timeline */}
            <div className="space-y-12">
              {journeyMilestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-8">
                  <div className="w-16 h-16 bg-indigo-600/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-indigo-600">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 font-sora">{milestone.title}</h3>
                    <p className="text-slate-700 text-lg mb-6 leading-relaxed">{milestone.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {milestone.artifacts.map((artifact, artifactIndex) => (
                        <Badge key={artifactIndex} className="bg-slate-50 text-slate-700 border-slate-200 px-4 py-2 rounded-full">
                          {artifact}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA */}
            <div className="text-center mt-16">
              <Button variant="outline" className="text-slate-700 hover:text-slate-900 border-slate-200 hover:border-indigo-600 px-8 py-4 rounded-full text-lg font-medium">
                <Play className="mr-3 h-5 w-5" />
                Watch 2-3 min Founder Walkthrough
              </Button>
            </div>
          </div>
        </section>

        {/* Security & Privacy */}
        <section className="py-24 bg-slate-50">
          <div className="mx-auto max-w-screen-xl px-6">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-slate-900 mb-6 font-sora">Security & Privacy</h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
                Your data, your control
              </p>
            </div>
            
            {/* Security Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <Shield className="h-16 w-16 text-indigo-600 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-4 font-sora">Consent-first Actions</h3>
                <p className="text-slate-700">No calendar or email sends without your "OK"</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <Target className="h-16 w-16 text-indigo-600 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-4 font-sora">Audit Trail</h3>
                <p className="text-slate-700">Every agent action is logged and reviewable</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <Clock className="h-16 w-16 text-indigo-600 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-4 font-sora">Scoped Tokens</h3>
                <p className="text-slate-700">OAuth only; encrypt at rest; revoke anytime</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <HeartPulse className="h-16 w-16 text-indigo-600 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-4 font-sora">Medical Disclaimer</h3>
                <p className="text-slate-700">Always visible in chat experiences</p>
              </div>
            </div>
            
            {/* Legal Links */}
            <div className="text-center mt-12">
              <div className="flex justify-center space-x-8">
                <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700 font-medium">Privacy Policy</Link>
                <Link href="/terms" className="text-indigo-600 hover:text-indigo-700 font-medium">Terms of Service</Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 bg-white">
          <div className="mx-auto max-w-screen-xl px-6">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-slate-900 mb-6 font-sora">Frequently Asked Questions</h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
                Everything you need to know about SyncOS
              </p>
            </div>
            
            {/* FAQ Items */}
            <div className="max-w-4xl mx-auto space-y-6">
              {faq.map((item, index) => (
                <Card key={index} className="p-8 rounded-2xl border-slate-200 shadow-sm hover:shadow-lg transition-all">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 font-sora">{item.question}</h3>
                  <p className="text-slate-700 text-lg leading-relaxed">{item.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-indigo-600 text-white">
          <div className="mx-auto max-w-screen-xl px-6 text-center">
            <h2 className="text-4xl font-bold mb-6 font-sora">Ready to Transform Your Health Journey?</h2>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join thousands of students and professionals who've simplified their wellness routine with AI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button size="lg" variant="secondary" asChild className="text-lg px-10 py-6 rounded-full font-medium shadow-lg">
                <Link href="/signup">
                  Start Your Free Trial
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-10 py-6 rounded-full font-medium bg-transparent border-white text-white hover:bg-white hover:text-indigo-600">
                <MessageCircle className="mr-3 h-5 w-5" />
                Schedule Demo
              </Button>
            </div>
            <p className="mt-8 text-sm text-indigo-200">
              Free for 14 days • No credit card required • Cancel anytime
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-screen-xl px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm">
                  <HeartPulse className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900 font-sora">SyncOS</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Where your health, schedule, and community line up.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-6 font-sora">Product</h3>
              <ul className="space-y-3 text-slate-700">
                <li><Link href="#product" className="hover:text-slate-900 transition-colors">Features</Link></li>
                <li><Link href="#integrations" className="hover:text-slate-900 transition-colors">Integrations</Link></li>
                <li><Link href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-slate-900 transition-colors">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-6 font-sora">Company</h3>
              <ul className="space-y-3 text-slate-700">
                <li><Link href="#journey" className="hover:text-slate-900 transition-colors">Our Journey</Link></li>
                <li><Link href="#community" className="hover:text-slate-900 transition-colors">Community</Link></li>
                <li><Link href="/press" className="hover:text-slate-900 transition-colors">Press</Link></li>
                <li><Link href="/contact" className="hover:text-slate-900 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-6 font-sora">Legal</h3>
              <ul className="space-y-3 text-slate-700">
                <li><Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-slate-900 transition-colors">Terms</Link></li>
                <li><Link href="/security" className="hover:text-slate-900 transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-700/70">
              © {new Date().getFullYear()} SyncOS. All Rights Reserved.
            </p>
            <div className="flex space-x-6 mt-6 md:mt-0">
              <Link href="#" className="text-slate-700/60 hover:text-indigo-600 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-slate-700/60 hover:text-indigo-600 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
