import { Timestamp } from '@google-cloud/firestore';
import { identityConverter } from '../utils/converter';

export interface EventDocument {
  title: string;
  startAt: Timestamp;
  editors: string[];
  published: boolean;
  organization?: string;
  description: string;
}

export const eventDocumentConverter = identityConverter<EventDocument>();
