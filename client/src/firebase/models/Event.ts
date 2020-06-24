import * as t from 'io-ts';
import {
  firestoreTimestamp,
  ioTsConverter,
  ioTsWithIdConverter,
} from '../../utils/io-types';

export const eventDocumentIo = t.intersection([
  t.type({
    title: t.string,
    startAt: firestoreTimestamp,
    editors: t.array(t.string),
    published: t.boolean,
    description: t.string,
  }),
  t.partial({
    organization: t.string,
  }),
]);

export type EventDocument = t.TypeOf<typeof eventDocumentIo>;
export type EventDocumentWithId = EventDocument & { _id: string };
export const eventDocumentConverter = ioTsConverter(eventDocumentIo);
export const eventDocumentWithIdConverter = ioTsWithIdConverter(
  eventDocumentIo,
);
