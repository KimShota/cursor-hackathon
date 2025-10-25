"use client";

import { Button } from "@/components/ui/button";
import { HeartPulse, Bot, Users, UtensilsCrossed, CalendarDays, BarChart2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";

const features = [
  {
    icon: Bot,
    title: "Agentic Assistant",
    description: "Your AI companion schedules events, sends emails, and finds workout partners.",
  },
  {
    icon: Users,
    title: "Buddy Matching",
    description: "Find verified workout buddies based on sport, schedule, and fitness level.",
  },
  {
    icon: UtensilsCrossed,
    title: "Smart Dining",
    description: "Get meal suggestions from dining halls that fit your diet and calorie goals.",
  },
  {
    icon: CalendarDays,
    title: "Unified Calendar",
    description: "Integrates your assignments and fitness goals into one seamless schedule.",
  },
  {
    icon: BarChart2,
    title: "Fitness Tracking",
    description: "Connects with your favorite fitness apps to provide personalized insights.",
  },
  {
    icon: HeartPulse,
    title: "Health Profile",
    description: "Securely manage your medical profile for context-aware assistance.",
  },
];

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/chat");
    }
  }, [user, router]);

  if (loading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <HeartPulse className="h-6 w-6 text-primary" />
            <span className="font-bold">HealthPal AI</span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-20 md:py-32">
          <div
            aria-hidden="true"
            className="absolute inset-0 top-0 h-full w-full bg-background [mask-image:radial-gradient(30%_100%_at_top,white,transparent)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(theme(colors.primary/0.1),transparent_70%)]"
          ></div>
          <div className="container relative text-center">
            <div className="mx-auto max-w-3xl">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Your Personal AI for Health & Productivity
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                HealthPal AI is a chat-first companion that unifies your
                calendar, fitness, and health data to help you thrive.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/signup">Get Started for Free</Link>
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                A Smarter Way to Manage Your Wellness
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                From your workouts to your diet, HealthPal AI brings it all
                together.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-lg border bg-card p-6 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-headline text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <HeartPulse className="h-6 w-6 text-primary" />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built for students and young professionals.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} HealthPal AI. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
