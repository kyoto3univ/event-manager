import { Timestamp } from '@google-cloud/firestore';
import { identityConverter } from '../utils/converter';

export interface EventSecretDocument {
  type: 'email' | 'push';
  title: string;
  content: string;
  sendAt: Timestamp;
  sent: boolean;
}

export const eventSecretDocumentConverter = identityConverter<
  EventSecretDocument
>();
