import * as t from 'io-ts';
import { ioTsConverter } from '../../utils/io-types';

export const applicationDocumentIo = t.type({
  userId: t.string,
  eventId: t.string,
  email: t.string,
  accepted: t.boolean,
});

export type ApplicationDocument = t.TypeOf<typeof applicationDocumentIo>;
export const applicationDocumentConverter = ioTsConverter(
  applicationDocumentIo,
);
