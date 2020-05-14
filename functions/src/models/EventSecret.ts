import * as t from 'io-ts';
import { firestoreTimestamp, ioTsConverter } from '../utils/io-types';

export const eventSecretDocumentIo = t.intersection([
  t.type({
    type: t.union([t.literal('email'), t.literal('push')]),
    title: t.string,
    content: t.string,
    sendAt: firestoreTimestamp,
    sent: t.boolean,
  }),
  t.partial({
    link: t.string,
  }),
]);
export type EventSecretDocument = t.TypeOf<typeof eventSecretDocumentIo>;

export const eventSecretDocumentConverter = ioTsConverter(
  eventSecretDocumentIo,
);
