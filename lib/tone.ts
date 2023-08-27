import { FormData, FormFieldConfig } from 'components/@tone/tone-form';

export const createSystemPrompt = ({
  tone,
  formalityLevel,
  vocabularyPreferences,
  targetAudience,
  culturalNuances,
  sentenceLengthPreference,
  brandValues,
  desiredCTA,
  USPs,
}: FormData): string => {
  const parts: string[] = ['Generate copy'];

  if (brandValues?.length) {
    parts.push(` for a ${brandValues} brand.`);
  } else {
    parts.push('.');
  }

  if (tone) parts.push(` The voice should be ${tone}`);

  if (formalityLevel) parts.push(`, ${formalityLevel}`);

  if (vocabularyPreferences)
    parts.push(`, using ${vocabularyPreferences} vocabulary`);

  if (targetAudience) parts.push(`. The target audience is ${targetAudience}`);

  if (culturalNuances) parts.push(`. The copy should be in ${culturalNuances}`);

  if (sentenceLengthPreference)
    parts.push(` with ${sentenceLengthPreference} sentences`);

  if (USPs) parts.push(`. Highlight the following USPs: ${USPs}`);

  if (desiredCTA) parts.push(`. End with a call to action: "${desiredCTA}"`);

  return parts.join('');
};

export const fields: FormFieldConfig[] = [
  {
    name: 'tone',
    type: 'input',
    placeholder: 'e.g. professional, playful, casual',
  },
  {
    name: 'formalityLevel',
    type: 'select',
    options: ['Formal', 'Informal', 'Conversational', 'Academic'],
  },
  {
    name: 'vocabularyPreferences',
    type: 'input',
    placeholder: 'e.g. modern tech jargon, eco-friendly terms',
  },
  {
    name: 'targetAudience',
    type: 'input',
    placeholder: 'e.g. tech-savvy, teens, professionals',
  },
  {
    name: 'culturalNuances',
    type: 'select',
    options: [
      'English',
      'Croatian',
      'German',
      'French',
      'Spanish',
      'Italian',
      'Portuguese',
      'Ukrainian',
      'Dutch',
      'Polish',
    ],
  },
  {
    name: 'sentenceLengthPreference',
    type: 'select',
    options: ['Short', 'Long'],
  },
  {
    name: 'brandValues',
    type: 'input',
    placeholder: 'e.g. environmentally conscious, luxury',
  },
  {
    name: 'desiredCTA',
    type: 'input',
    placeholder: 'e.g. Learn more, Buy now',
  },
  {
    name: 'USPs',
    type: 'input',
    placeholder: 'e.g. sustainable, durable, affordable',
  },
];
