import * as t from 'io-ts';
import { ioTsConverter } from '../utils/io-types';

export const userDocumentIo = t.intersection([
  t.type({
    role: t.union([t.literal('ADMIN'), t.literal('EDITOR')]),
    email: t.string,
  }),
  t.partial({
    displayName: t.string,
  }),
]);
export type UserDocument = t.TypeOf<typeof userDocumentIo>;

export const userDocumentConverter = ioTsConverter(userDocumentIo);
