import { identityConverter } from '../utils/converter';

export interface ApplicationDocument {
  id: string; // document id
  eventId: string; // eventId is just a string, client for visitors should fetch event from realtime database due to rate limit
  email: string;
  accepted: boolean;
}

export const applicationDocumentConverter = identityConverter<
  ApplicationDocument
>();
