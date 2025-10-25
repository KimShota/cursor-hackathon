'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { mockCalendarEvents } from "@/lib/mock-data";
import { format } from "date-fns";

export default function CalendarPage() {

    const sortedEvents = [...mockCalendarEvents].sort((a,b) => a.startAt.getTime() - b.startAt.getTime());

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="flex items-center gap-2"><CalendarIcon /> Your Calendar</CardTitle>
                <CardDescription>A summary of your upcoming events and assignments.</CardDescription>
            </div>
            <Button><Plus className="mr-2 h-4 w-4"/>Add Event</Button>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {sortedEvents.map(event => (
                    <div key={event.id} className="flex items-center gap-4 rounded-lg border p-4">
                        <div className="flex flex-col items-center justify-center w-16 text-center">
                            <p className="font-bold text-lg">{format(event.startAt, 'dd')}</p>
                            <p className="text-sm text-muted-foreground">{format(event.startAt, 'MMM')}</p>
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold">{event.title}</p>
                            <p className="text-sm text-muted-foreground">
                                {format(event.startAt, 'p')} - {format(event.endAt, 'p')}
                            </p>
                        </div>
                        <div>
                             <Badge variant={event.source === 'google' ? 'secondary' : 'default'}>
                                {event.source === 'google' ? 'Google Calendar' : 'HealthPal'}
                            </Badge>
                        </div>
                    </div>
                ))}
                {sortedEvents.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg">
                        <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground"/>
                        <h3 className="mt-4 text-lg font-semibold">No upcoming events</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Use the chat to schedule new events.</p>
                    </div>
                )}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
