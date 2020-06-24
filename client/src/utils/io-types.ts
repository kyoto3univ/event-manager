import { FirestoreDataConverter, Timestamp } from '@google-cloud/firestore';
import { isRight } from 'fp-ts/lib/Either';
import * as t from 'io-ts';

export const firestoreTimestamp = new t.Type<Timestamp>(
  'Timestamp',
  (ts): ts is Timestamp => ts instanceof Timestamp,
  (ts, ctx) => (ts instanceof Timestamp ? t.success(ts) : t.failure(ts, ctx)),
  t.identity,
);

export const ioTsConverter = <C extends t.Any>(
  type: C,
): FirestoreDataConverter<C['_A']> => ({
  toFirestore(doc) {
    return type.encode(doc);
  },
  fromFirestore(data) {
    const decoded = type.decode(data);
    if (isRight(decoded)) return decoded.right;
    throw decoded.left;
  },
});
