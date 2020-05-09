import { identityConverter } from '../utils/converter';

export interface UserDocument {
  id: string;
  role: 'ADMIN' | 'EDITOR';
  email: string;
  displayName?: string;
}

export const userDocumentConverter = identityConverter<UserDocument>();
