'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToneDescription } from '@prisma/client/edge';
import * as z from 'zod';

import { Button } from 'ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from 'ui/form';
import { Input } from 'ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui/select';
import { toast } from 'ui/use-toast';

import {
  createToneDescription,
  updateToneDescription,
} from 'lib/api/actions/tone';
import { fields } from 'lib/tone';
import { toneSchema } from 'lib/validations/tone';

interface ToneFormProps {
  projectId: string;
  toneDescription: ToneDescription | null;
}

export type FormData = z.infer<typeof toneSchema>;

type FieldNames = keyof FormData;

export interface FormFieldConfig {
  name: FieldNames;
  type: 'input' | 'select';
  placeholder?: string;
  options?: string[];
}

export const ToneForm = ({ projectId, toneDescription }: ToneFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(toneSchema),
    defaultValues: {
      tone: toneDescription?.tone ?? '',
      formalityLevel: toneDescription?.formalityLevel ?? '',
      vocabularyPreferences: toneDescription?.vocabularyPreferences ?? '',
      targetAudience: toneDescription?.targetAudience ?? '',
      culturalNuances: toneDescription?.culturalNuances ?? '',
      sentenceLengthPreference: toneDescription?.sentenceLengthPreference ?? '',
      brandValues: toneDescription?.brandValues ?? '',
      desiredCTA: toneDescription?.desiredCTA ?? '',
      USPs: toneDescription?.USPs ?? '',
    },
  });

  const onSubmit = async (data: FormData) => {
    if (toneDescription) {
      await updateToneDescription(toneDescription.id, data);
    } else {
      await createToneDescription(projectId, data);
    }

    toast({
      description: 'Successfully saved tone description',
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="md:grid md:grid-cols-2 md:gap-8"
      >
        {fields.map((field) => (
          <div key={field.name}>
            <FormField
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>
                    {field.name
                      .replace(/([A-Z])/g, ' $1')
                      .charAt(0)
                      .toUpperCase() +
                      field.name.replace(/([A-Z])/g, ' $1').slice(1)}
                  </FormLabel>
                  <FormControl>
                    <div>
                      {field.type === 'input' ? (
                        <Input
                          type="text"
                          placeholder={field.placeholder || ''}
                          {...formField}
                        />
                      ) : null}
                      {field.type === 'select' ? (
                        <Select
                          onValueChange={formField.onChange}
                          defaultValue={formField.value}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={field.placeholder || ''}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {field.options?.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      ) : null}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        ))}
        <div className="md:col-span-2">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};
