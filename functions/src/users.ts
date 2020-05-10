import * as admin from 'firebase-admin';
import { firestore } from 'firebase-functions';

export const setUserRole = firestore
  .document('/users/{userId}')
  .onWrite(async (snapshot, context) => {
    const { userId } = context.params;
    await admin.auth().setCustomUserClaims(
      userId,
      snapshot.after
        ? {
            role: snapshot.after.data()?.role || 'EDITOR',
          }
        : {
            role: null,
          },
    );
  });
