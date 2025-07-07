'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { getSuggestedChannels } from '@/app/games/[slug]/actions';
import { useToast } from '@/hooks/use-toast';
import { Share2, Wand2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface ShareScoreDialogProps {
  gameName: string;
  score: number;
}

export default function ShareScoreDialog({ gameName, score }: ShareScoreDialogProps) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [suggestedChannels, setSuggestedChannels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      const fetchChannels = async () => {
        setLoading(true);
        try {
          const result = await getSuggestedChannels(gameName, score);
          setSuggestedChannels(result.channels);
        } catch (error) {
          console.error('Failed to get channel suggestions:', error);
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not fetch channel suggestions.',
          });
        } finally {
          setLoading(false);
        }
      };
      fetchChannels();
    }
  }, [open, gameName, score, toast]);
  
  const handleShare = () => {
    console.log({
        message: `I just scored ${score} in ${gameName}! ${comment}`,
        suggestedChannels: suggestedChannels
    });
    toast({
        title: "Score Shared!",
        description: "Your score has been successfully shared to the console.",
    });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-accent hover:bg-accent/90">
          <Share2 className="mr-2 h-5 w-5" />
          Share Score
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share your score</DialogTitle>
          <DialogDescription>
            Share your new high score of {score} in {gameName} with the world!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="comment">Add a comment (optional)</Label>
            <Textarea
              id="comment"
              placeholder={`I just scored ${score} in ${gameName}!`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label className="flex items-center">
              <Wand2 className="mr-2 h-4 w-4 text-accent" />
              Suggested Channels
            </Label>
            <div className="flex flex-wrap gap-2">
              {loading ? (
                <>
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </>
              ) : (
                suggestedChannels.map((channel) => (
                  <Badge key={channel} variant="secondary" className="cursor-pointer hover:bg-primary/20">
                    /{channel}
                  </Badge>
                ))
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleShare}>Share on Farcaster</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
