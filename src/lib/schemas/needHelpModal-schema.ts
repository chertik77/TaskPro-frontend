import { email, minLength, object, string, toTrimmed, type Output } from 'valibot';

export const needHelpSchema = object({
  email: string([
    toTrimmed(),
    email('Please enter a valid email address.')
  ]),
  comment: string([
    toTrimmed(),
    minLength(5, 'Please enter at least 5 characters.')
  ])
});

export type NeedHelpModal = Output<typeof needHelpSchema>;
