import { FirestoreDataConverter } from '@google-cloud/firestore';

export const identityConverter = <T>(): FirestoreDataConverter<T> => ({
  toFirestore(doc) {
    return doc;
  },
  fromFirestore(data) {
    return data as T;
  },
});
