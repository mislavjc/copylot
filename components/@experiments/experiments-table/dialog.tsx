import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from 'ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'ui/dialog';
import { Input } from 'ui/input';
import { Label } from 'ui/label';

import { createExperiment } from 'lib/api/actions';

import { Textarea } from '../../ui/textarea';

export const ExperimentDialog = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { project } = useParams();

  const onSubmit = async () => {
    setIsSubmitting(true);

    const experiment = await createExperiment(project as string, {
      name,
      description,
    });

    router.push(`/${project}/dashboard/experiments/${experiment.id}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-4">Start an experiment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Start an experiment</DialogTitle>
          <DialogDescription>
            An experiment is a way to test a copy&apos;s performance.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              className="col-span-3"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button disabled={isSubmitting} onClick={onSubmit}>
            {isSubmitting ? 'Creating...' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
