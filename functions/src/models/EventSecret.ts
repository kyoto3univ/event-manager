import * as t from 'io-ts';
import { firestoreTimestamp, ioTsConverter } from '../utils/io-types';

export const eventSecretDocumentIo = t.type({
  type: t.union([t.literal('email'), t.literal('push')]),
  title: t.string,
  content: t.string,
  sendAt: firestoreTimestamp,
  sent: t.boolean,
});
export type EventSecretDocument = t.TypeOf<typeof eventSecretDocumentIo>;

export const eventSecretDocumentConverter = ioTsConverter(
  eventSecretDocumentIo,
);
