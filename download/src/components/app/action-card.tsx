'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check, Database, Eye, Send, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useToast } from '@/hooks/use-toast';

interface ActionCardProps {
  actionType: 'CREATE_CAL_EVENT' | 'SEND_EMAIL' | 'MATCH_BUDDY';
  payload: any;
  previewMarkdown: string;
}

const actionDetails = {
  CREATE_CAL_EVENT: {
    title: 'Schedule Event',
    description: 'Creates a new event in your calendar.',
    dataAccessed: ['Calendar free/busy', "Friends' availability"],
  },
  SEND_EMAIL: {
    title: 'Send Email',
    description: 'Sends an email on your behalf.',
    dataAccessed: ['User profile', 'Contact information'],
  },
  MATCH_BUDDY: {
    title: 'Find Workout Buddy',
    description: 'Finds and invites a workout partner.',
    dataAccessed: ['Fitness profile', 'Friends list', 'Recent activity'],
  },
};

export function ActionCard({
  actionType,
  payload,
  previewMarkdown,
}: ActionCardProps) {
  const { toast } = useToast();
  const details = actionDetails[actionType];

  const handleConfirm = () => {
    // Simulate API call to execute action
    console.log('Executing action:', actionType, payload);
    toast({
      title: 'Action Confirmed',
      description: `${details.title} has been scheduled for execution.`,
    });
  };

  const handleCancel = () => {
    toast({
      title: 'Action Canceled',
      variant: 'destructive',
    });
  };

  return (
    <Card className="bg-background/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          {actionType === 'CREATE_CAL_EVENT' && <CalendarDays className="h-5 w-5 text-primary" />}
          {actionType === 'SEND_EMAIL' && <Send className="h-5 w-5 text-primary" />}
          {actionType === 'MATCH_BUDDY' && <Users className="h-5 w-5 text-primary" />}
          <span>Agent Action: {details.title}</span>
        </CardTitle>
        <CardDescription>{details.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="prose prose-sm dark:prose-invert rounded-md border bg-muted/50 p-3">
          <ReactMarkdown>{previewMarkdown}</ReactMarkdown>
        </div>
        <div className="space-y-2">
          <h4 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <Eye className="h-4 w-4" /> Data to be accessed:
          </h4>
          <div className="flex flex-wrap gap-2">
            {details.dataAccessed.map((item) => (
              <span
                key={item}
                className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={handleCancel}>
          <X className="mr-1.5 h-4 w-4" />
          Cancel
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm">
              <Check className="mr-1.5 h-4 w-4" />
              Confirm
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Action</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to {details.description.toLowerCase()}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="prose prose-sm dark:prose-invert rounded-md border p-4">
                 <ReactMarkdown>{previewMarkdown}</ReactMarkdown>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm}>
                Yes, Proceed
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

// Dummy icons for compilation
const CalendarDays = Database;
const Users = Database;
