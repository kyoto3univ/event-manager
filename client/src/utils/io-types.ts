import { firestore } from 'firebase/app';
import { isRight } from 'fp-ts/lib/Either';
import * as t from 'io-ts';

export const firestoreTimestamp = new t.Type<firestore.Timestamp>(
  'Timestamp',
  (ts): ts is firestore.Timestamp => ts instanceof firestore.Timestamp,
  (ts, ctx) =>
    ts instanceof firestore.Timestamp ? t.success(ts) : t.failure(ts, ctx),
  t.identity,
);

export const ioTsConverter = <C extends t.Any>(
  type: C,
): firestore.FirestoreDataConverter<C['_A']> => ({
  toFirestore(doc) {
    return type.encode(doc);
  },
  fromFirestore(snapshot) {
    const decoded = type.decode(snapshot.data());
    if (isRight(decoded)) return decoded.right;
    throw decoded.left;
  },
});
